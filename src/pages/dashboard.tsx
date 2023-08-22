import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MenuBar from "~/components/MenuBar";
import { api } from "~/utils/api";

export default function Home() {
	const router = useRouter();
	const user = useUser();
	const server = api.discord.discordMafia.useQuery();

	useEffect(() => {
		console.log(server.data);
	}, [server, server.isLoading]);

	useEffect(() => {
		if (!user.isSignedIn) {
			router.push("/login").catch(console.log);
		}
	}, [user, user.isSignedIn, router]);

	return (
		<>
			<Head>
				<title>Mafia Engine - Dashboard</title>
			</Head>
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

				{server.isLoading && (
					<div className="animate-pulse">Loading...</div>
				)}
				{server.isError && <div>Error loading server</div>}
				{server.data?.isAdministrator && (
					<p className="text-md text-center">Welcome</p>
				)}

				{!server.data ||
					(!server.data.isAdministrator && (
						<p className="text-md text-center">
							You need to be an administrator to access this page.
							<br />
							Visit the{" "}
							<a
								href="https://discord.gg/social-deduction"
								rel="noopener noreferrer"
								className="underline hover:text-red-400"
							>
								Discord
							</a>
						</p>
					))}
			</main>
		</>
	);
}
