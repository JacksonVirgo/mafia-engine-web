import { authMiddleware } from "@clerk/nextjs";

const PUBLIC_ROUTES: Array<string> = [
	"/",
	"/login",
	"/about",
	"/downloads",
	"/gameplay",
];

export default authMiddleware({
	publicRoutes: PUBLIC_ROUTES,
	signInUrl: "/login",
	// beforeAuth: () => {},
	// debug: true
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
