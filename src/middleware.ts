import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: ["/", "/login", "/about"],
	signInUrl: "/login",
	// afterAuth: () => {},
	// beforeAuth: () => {},
	// debug: true
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
