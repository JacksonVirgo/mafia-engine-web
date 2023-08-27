import { SignUp, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import { Loading } from "~/components/subpages/Loading";

export default function Home() {
	const user = useUser();

	if (!user.isLoaded) {
		return <Loading />;
	}

	if (user.isSignedIn) {
		return <div>What</div>;
	}
	return (
		<>
			<Head>
				<title>Mafia Engine - Login</title>
			</Head>
			<main
				className="flex h-smallview flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<AbsoluteCopyright />

				<p>
					<SignUp
						appearance={{
							baseTheme: dark,
						}}
					/>
				</p>
			</main>
		</>
	);
}
