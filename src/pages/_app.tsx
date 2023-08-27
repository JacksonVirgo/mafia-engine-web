import { type AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import loadFontAwesome from "~/utils/fontAwesome";
import type { Session } from "next-auth";
import { ClerkProvider } from "@clerk/nextjs";

loadFontAwesome();

function MyApp({
	Component,
	pageProps,
}: AppProps<{
	session: Session;
}>) {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<SessionProvider session={pageProps.session}>
				<NextUIProvider>
					<Component {...pageProps} />
				</NextUIProvider>
			</SessionProvider>
		</ClerkProvider>
	);
}

export default api.withTRPC(MyApp);
