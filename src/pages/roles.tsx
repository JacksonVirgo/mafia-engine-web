import Head from "next/head";
import Link from "next/link";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";

export default function Roles() {
	return (
		<>
			<Head>
				<title>Mafia Engine - Roles</title>
			</Head>
			<main className="bg-darkGray">
				<div
					className="box-border flex h-smallview flex-col items-center justify-center bg-darkGray bg-repeat pb-16 text-white sm:pt-24"
					style={{
						backgroundImage: "url(/chalkboard.jpg)",
					}}
				>
					<MenuBar />
					<AbsoluteCopyright />
				</div>
			</main>
		</>
	);
}

export function JoinWaitlist() {
	return (
		<div>
			<Link href="/waitlist">
				<div className="rounded-full border border-white bg-opacity-100 p-2 px-4 text-center hover:bg-red-500 hover:bg-opacity-20 hover:underline">
					<span>Join the Waitlist</span>
				</div>
			</Link>
		</div>
	);
}
