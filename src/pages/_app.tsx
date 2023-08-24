import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { fas, faCircleXmark, faBars } from "@fortawesome/free-solid-svg-icons";

library.add(fas, faDiscord, faCircleXmark, faBars);

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<Component {...pageProps} />
		</ClerkProvider>
	);
};

export default api.withTRPC(MyApp);
