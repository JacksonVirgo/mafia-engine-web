import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";

export default function Pricing() {
	return (
		<>
			<Head>
				<title>Mafia Engine - Pricing</title>
			</Head>
			<main
				className="flex h-smallview flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<AbsoluteCopyright />

				<h1 className="mb-4 mt-24 text-center text-6xl font-extrabold">
					<span className="text-red-400">Pricing</span> Model
				</h1>
				<p className="px-4 text-center text-lg">Just kidding!</p>
			</main>
		</>
	);
}
