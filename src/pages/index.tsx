import Head from "next/head";
import InfoPanel from "~/components/InfoPanel";
import MenuBar from "~/components/MenuBar";

export default function Home() {
	return (
		<>
			<Head>
				<title>Mafia Engine</title>
			</Head>
			<main
				className="flex h-full min-h-screen flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<h1 className="mb-2 mt-24 text-center text-6xl font-extrabold">
					<span className="text-red-400">Mafia</span> Engine
				</h1>
				<p className="px-4 text-center text-lg">
					Discord bot for a community of dedicated players of Mafia.
				</p>
				<div className="my-8 flex flex-row flex-wrap justify-center gap-4">
					<InfoPanel
						name="Wiki"
						info="Our wiki has all the information you'd need to play games of Mafia. This includes basic roles, setups and articles"
						link="https://discord-mafia-role-cards.fandom.com/wiki/Discord_Mafia_Role_cards_Wiki"
						linkText="Visit our Wiki"
					/>
					<InfoPanel
						name="Discord"
						info="We play all of our games and our community is on this discord server. Join us for fun games of mafia with a dedicated playerbase"
						link="https://discord.gg/social-deduction"
						linkText="Join our Discord"
					/>
					<InfoPanel
						name="YouTube"
						info="We are about to roll out a YouTube channel with videos on how to play Mafia, how to host games and more."
						link="https://www.youtube.com/@social-deduction"
						linkText="Check out our YouTube"
					/>
				</div>
				<div className="mb-16 w-48 text-center">
					<JoinDiscordButton />
				</div>
			</main>
		</>
	);
}

export function JoinDiscordButton() {
	return (
		<a href="https://discord.gg/social-deduction" rel="noopener noreferrer">
			<div className="rounded-full border border-white bg-opacity-100 p-2 px-4 text-center hover:bg-red-500 hover:bg-opacity-20 hover:underline">
				<span>Join the Discord</span>
			</div>
		</a>
	);
}
