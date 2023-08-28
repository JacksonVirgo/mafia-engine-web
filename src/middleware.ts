import { authMiddleware, clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";
import type { AuthResponse } from "./pages/api/authCheck";

type Routes = {
	Admin: string[];
	Moderator: string[];
	Host: string[];
	User: string[];
	Public: string[];
};

const ROUTES: Routes = {
	Admin: ["/dashboard/users", "/dashboard/archives", "/dashboard/roles"],
	Moderator: [],
	Host: [],
	User: ["/dashboard"],
	Public: ["/", "/login", "/signup", "/about", "/downloads", "/gameplay"],
};

function getDiscordUser(user: User) {
	const accounts = user.externalAccounts;
	const discordAccount = accounts.find(
		(account) => account.provider === "oauth_discord"
	);
	if (!discordAccount) return null;

	return discordAccount;
}

function isValidAPIResponse(value: unknown): value is AuthResponse {
	if (!value) return false;
	if (typeof value !== "object") return false;

	if ("error" in value) {
		if (typeof value.error !== "string") return false;
		return true;
	}

	if (!("discordId" in value)) return false;
	if (!("username" in value)) return false;
	if (!("permission" in value)) return false;

	if (typeof value.discordId !== "string") return false;
	if (typeof value.username !== "string") return false;
	if (typeof value.permission !== "string") return false;

	return true;
}

export default authMiddleware({
	publicRoutes: ROUTES.Public,
	signInUrl: "/login",

	async afterAuth(auth, req, _evt) {
		if (auth.isPublicRoute) return NextResponse.next();
		if (auth.isApiRoute) return NextResponse.next();

		const pathname = new URL(req.url).pathname;

		const baseRoute = new URL("/", req.url);
		const loginRoute = new URL("/login", req.url);
		const dashboardRoute = new URL("/dashboard", req.url);

		const userID = auth.user?.id ?? auth.userId;
		if (!userID) return NextResponse.redirect(loginRoute);

		const user = await clerkClient.users.getUser(userID);
		if (!user) return NextResponse.redirect(loginRoute);

		const discordAccount = getDiscordUser(user);
		if (!discordAccount) return NextResponse.redirect(loginRoute);

		try {
			const val = await fetch(
				`${baseRoute.href}/api/authCheck?id=${discordAccount.externalId}`
			);

			switch (val.status) {
				case 400:
				case 404:
					return NextResponse.redirect(loginRoute);
				case 200:
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					const json = await val.json();
					if (!isValidAPIResponse(json))
						return NextResponse.redirect(loginRoute);

					if ("error" in json)
						return NextResponse.redirect(loginRoute);

					const isAdmin = json.permission === "Admin";
					const isModerator = json.permission === "Moderator";
					const isHost = json.permission === "Host";
					const isUser = json.permission === "User";

					if (isAdmin) return NextResponse.next();

					if (
						ROUTES.User.includes(pathname) &&
						(isUser || isHost || isModerator || isAdmin)
					)
						return NextResponse.next();

					return NextResponse.redirect(dashboardRoute);

				default:
					console.log(
						"Unknown status response in middleware:",
						val.status
					);
					return NextResponse.redirect(dashboardRoute);
			}
		} catch (err) {
			console.log(err);
			return NextResponse.redirect(baseRoute);
		}
	},
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
