import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import { api } from "~/utils/api";

export default function Pricing() {
	const waitlist = api.discord.waitlist.useMutation();

	const onClick = async () => {
		const response = await waitlist.mutateAsync();
		if (response == null) console.log("null response");
		return;
	};

	return (
		<>
			<Head>
				<title>Mafia Engine - Waitlist</title>
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
					<span className="text-red-400">Wait</span>list
				</h1>
				<p className="w-1/3 px-4 text-center text-lg">
					The Mafia Engine bot is not yet available for public access
					but, you may join the waitlist by clicking the button below.
				</p>

				<button
					className="mt-4 rounded-md bg-zinc-800 px-4 py-2 text-white"
					onClick={() => {
						onClick().catch(console.log);
					}}
				>
					Join Waitlist
				</button>
			</main>
		</>
	);
}
