import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
	fas,
	faCircleXmark,
	faBars,
	faEllipsisVertical,
	faPenToSquare,
	faX,
	faAngleLeft,
	faAnglesLeft,
	faAngleRight,
	faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { NextUIProvider } from "@nextui-org/react";

library.add(
	fas,
	faDiscord,
	faCircleXmark,
	faBars,
	faEllipsisVertical,
	faPenToSquare,
	faX
);

library.add(faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight);

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<NextUIProvider>
				<Component {...pageProps} />
			</NextUIProvider>
		</ClerkProvider>
	);
};

export default api.withTRPC(MyApp);
