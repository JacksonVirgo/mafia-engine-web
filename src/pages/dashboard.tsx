import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MenuBar from "~/components/MenuBar";
import { api } from "~/utils/api";

export default function Home() {
	const router = useRouter();
	const user = useUser();
	const data = api.auth.getUserData.useQuery();

	useEffect(() => {
		if (!user.isSignedIn) {
			router.push("/login").catch(console.log);
		}
	}, [user, user.isSignedIn, router]);

	return (
		<>
			<main
				className="flex h-screen flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />

				<h1 className="mb-2 text-6xl font-extrabold">
					<span className="text-red-400">Dash</span>board
				</h1>
				<p className="text-center text-lg">
					This site is in an invite-only closed beta.
				</p>
				<p className="text-md text-center">
					{data.data?.user?.username
						? data.data.user.username + ", you"
						: "You"}{" "}
					do not have access to this page.
				</p>
			</main>
		</>
	);
}
