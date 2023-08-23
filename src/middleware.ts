import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: ["/", "/login", "/contact", "/about"],
	// afterAuth: () => {},
	// beforeAuth: () => {},
	// debug: true
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
