import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import imgSignups from "~/assets/gameplay_signups.png";

export default function Home() {
	return (
		<>
			<Head>
				<title>Mafia Engine</title>
			</Head>
			<main
				className="flex h-full min-h-screen w-auto flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<AbsoluteCopyright />
				<MenuBar />

				<h1 className="mb-8 text-center text-6xl font-extrabold sm:mt-24">
					Gameplay
				</h1>
				<div className="w-2/3">
					<div className="flex w-full flex-row items-center justify-center gap-10  align-middle">
						<div>
							<img
								src={imgSignups.src}
								alt="Screenshot of signups channel"
								className="h-96 w-auto rounded-lg border-2 border-white"
							/>
						</div>
						<div className="flex h-full w-2/3 flex-col justify-center gap-2 align-middle">
							<h2 className="mb-8 text-3xl">Signups</h2>
							<p>
								The first step to playing a game in Discord
								Mafia is to... sign up for one.
							</p>
							<p>
								For every signup that starts, a member of the
								staff will create a channel and notify everybody
								in the Announcements channel, with a direct link
								to the channel itself.
							</p>
							<p>
								In that channel, you will see a nice form just
								like the one shown on the left. Read what the
								game is going to be and if you want to play, and
								if there&apos;s room, the &quot;Play&quot;
								button will be clickable. Just click that and
								wait for the game to start!
							</p>
							<p>
								If you wish to discuss or ask questions about
								the game, there will be a thread you can join as
								shown in the screenshot
							</p>
						</div>
					</div>
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
