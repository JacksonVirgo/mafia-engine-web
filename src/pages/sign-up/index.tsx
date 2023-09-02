import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import { Loading } from "~/components/subpages/Loading";

export default function Home() {
	const user = useUser();
	const router = useRouter();

	useEffect(() => {
		if (user.isSignedIn)
			router.push("/").catch((err) => console.error(err));
	}, [user, router, user.isSignedIn]);

	if (!user.isLoaded) {
		return <Loading />;
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
