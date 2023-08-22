import Head from "next/head";
import MenuBar from "~/components/MenuBar";

export default function Home() {
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
			</main>
		</>
	);
}
