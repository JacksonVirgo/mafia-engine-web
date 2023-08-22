import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";

export default function MenuBar() {
	const user = useUser();

	// TODO:
	// Remove HOME when at HOME
	// Add LOGIN when not logged in
	// Add DASHBOARD when logged in and not at DASHBOARD

	return (
		<div className="absolute left-0 top-0 flex w-full flex-row items-center justify-start border-b border-b-white bg-black bg-opacity-30 p-2 align-middle">
			<HomeButton />
			<div className="grow"></div>
			{user.isSignedIn && (
				<UserButton
					appearance={{
						baseTheme: dark,
					}}
				/>
			)}
			{!user.isSignedIn && <LoginButton />}
		</div>
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

function HomeButton() {
	return (
		<Link href="/">
			<div className="items-center rounded-full bg-opacity-100 p-1 px-4 text-center align-middle text-sm  hover:bg-white hover:bg-opacity-10 hover:underline">
				{/* <FontAwesomeIcon icon={faHome} /> */}
				<span className="pl-1">Home</span>
			</div>
		</Link>
	);
}
