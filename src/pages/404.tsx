import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";

export default function NotFound() {
	return (
		<>
			<Head>
				<title>Mafia Engine - Unknown Page</title>
			</Head>
			<main
				className="flex h-screen flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<AbsoluteCopyright />

				<h1 className="mb-2 text-6xl font-extrabold">
					<span className="text-red-400">404</span>
				</h1>
				<p className="text-center text-lg">Page not found</p>
			</main>
		</>
	);
}
