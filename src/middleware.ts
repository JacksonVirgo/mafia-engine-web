import { withClerkMiddleware } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
// export default authMiddleware({

// });

export default withClerkMiddleware((_req: NextRequest) => {
	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
