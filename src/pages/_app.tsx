import { type AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import loadFontAwesome from "~/utils/fontAwesome";
import { ClerkProvider } from "@clerk/nextjs";

loadFontAwesome();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<NextUIProvider>
				<Component {...pageProps} />
			</NextUIProvider>
		</ClerkProvider>
	);
}

export default api.withTRPC(MyApp);
