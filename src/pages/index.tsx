import { SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import MenuBar from "~/components/MenuBar";

export default function Home() {
	const user = useUser();
	return (
		<>
			<Head>
				<title>Mafia Engine</title>
			</Head>
			<main
				className="flex h-screen max-h-screen flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<h1 className="mb-2 text-6xl font-extrabold">
					<span className="text-red-400">Mafia</span> Engine
				</h1>
				<p className="text-lg">
					This site is in an invite-only closed beta.
				</p>
				<p></p>
				<p>
					Visit the{" "}
					<a
						href="https://discord.gg/social-deduction"
						rel="noopener noreferrer"
						className="underline hover:text-red-400"
					>
						Discord
					</a>
				</p>
				<br />
				<div className="w-32 text-center">
					{!user.isSignedIn && <LoginButton />}
					{!!user.isSignedIn && <SignOutButton />}
				</div>
			</main>
		</>
	);
}

export function LoginButton() {
	return (
		<Link href="/login">
			<div className="rounded-full border border-white bg-opacity-100 p-1 px-4 text-center hover:bg-white hover:bg-opacity-10 hover:underline">
				<span>Login</span>
			</div>
		</Link>
	);
}
