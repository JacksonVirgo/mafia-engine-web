import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import InfoPanel from "~/components/InfoPanel";
import MenuBar from "~/components/MenuBar";

export default function Home() {
	return (
		<>
			<Head>
				<title>Mafia Engine</title>
			</Head>
			<main
				className="flex h-smallview w-auto flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<AbsoluteCopyright />
				<MenuBar />

				<h1 className="mb-2 text-center text-6xl font-extrabold sm:mt-24">
					<span className="text-red-400">Mafia</span> Engine
				</h1>
				<p className="px-4 text-center text-lg">
					Discord bot for a community of dedicated players of Mafia.
				</p>
				<div className="mx-2 my-8 flex flex-row flex-wrap justify-center gap-4 sm:mx-0">
					<InfoPanel
						name="Wiki"
						info="Provides you with anything that is to know about Mafia. Roles, Mechanics, Guides, Anything."
						link="https://discord-mafia-role-cards.fandom.com/wiki/Discord_Mafia_Role_cards_Wiki"
						linkText="Visit our Wiki"
					/>
					<InfoPanel
						name="Discord"
						info="We base our community on Discord. Join us to hang out and play some Mafia!"
						link="https://discord.gg/social-deduction"
						linkText="Join our Discord"
					/>
					<InfoPanel
						name="YouTube"
						info="Guides on playing and hosting Mafia, funny moments and other wacky stuff!"
						link="https://www.youtube.com/@social-deduction"
						linkText="Check out our YouTube"
					/>
				</div>
				<div className="mb-16 hidden w-48 text-center sm:block">
					<JoinWaitlist />
				</div>
			</main>
		</>
	);
}

export function JoinWaitlist() {
	return (
		<a href="https://discord.gg/social-deduction" rel="noopener noreferrer">
			<div className="rounded-full border border-white bg-opacity-100 p-2 px-4 text-center hover:bg-red-500 hover:bg-opacity-20 hover:underline">
				<span>Join the Waitlist</span>
			</div>
		</a>
	);
}
