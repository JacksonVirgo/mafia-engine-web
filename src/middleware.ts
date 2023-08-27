import { authMiddleware, clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";
import type { AuthResponse } from "./pages/api/auth";
import type { Permission } from "@prisma/client";

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
	Public: [
		"/",
		"/login",
		"/about",
		"/downloads",
		"/gameplay",
		"/dashboard/roles",
	],
};

// THE ORDER OF THIS ARRAY IS IMPORTANT
// DO NOT CHANGE IT
// I REPEAT
// DO NOT CHANGE IT
// I will create unit tests for this later.
const PERMISSION_TREE: Permission[] = ["Admin", "Moderator", "Host", "User"];

function isPermissionOrHigher(permission: Permission, request: Permission) {
	const permissionIndex = PERMISSION_TREE.indexOf(permission);
	const requestIndex = PERMISSION_TREE.indexOf(request);

	if (permissionIndex === -1) return false;
	if (requestIndex === -1) return false;

	if (permissionIndex < requestIndex) return false;
	return true;
}

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
				`${baseRoute.href}/api/auth?id=${discordAccount.externalId}`
			);

			switch (val.status) {
				case 400:
				case 404:
					return NextResponse.redirect(loginRoute);
					break;
				case 200:
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					const json = await val.json();
					if (!isValidAPIResponse(json))
						return NextResponse.redirect(loginRoute);

					if ("error" in json)
						return NextResponse.redirect(loginRoute);

					const pathname = req.nextUrl.pathname;

					if (ROUTES.Admin.includes(pathname)) {
						if (isPermissionOrHigher(json.permission, "Admin"))
							return NextResponse.next();
					} else if (ROUTES.Moderator.includes(pathname)) {
						if (isPermissionOrHigher(json.permission, "Moderator"))
							return NextResponse.next();
					} else if (ROUTES.Host.includes(pathname)) {
						if (isPermissionOrHigher(json.permission, "Host"))
							return NextResponse.next();
					} else if (ROUTES.User.includes(pathname)) {
						if (isPermissionOrHigher(json.permission, "User"))
							return NextResponse.next();
					} else {
						// To be safe, redirect to dashboard.
						return NextResponse.redirect(dashboardRoute);
					}
					break;
				default:
					console.log(
						"Unknown status response in middleware:",
						val.status
					);
					return NextResponse.redirect(baseRoute);
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
