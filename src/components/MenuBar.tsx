import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LoginButton } from "~/pages";

export default function MenuBar() {
	const user = useUser();

	// TODO:
	// Remove HOME when at HOME
	// Add LOGIN when not logged in
	// Add DASHBOARD when logged in and not at DASHBOARD

	return (
		<div className="absolute left-0 top-0 flex w-full flex-row justify-start border-b border-b-white bg-black bg-opacity-30 p-2 align-middle">
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

function HomeButton() {
	return (
		<Link href="/">
			<div className="rounded-full bg-opacity-100 p-1 px-4 text-center align-middle text-sm hover:bg-white hover:bg-opacity-10 hover:underline">
				<FontAwesomeIcon icon={faHome} />
				<span className="pl-1">Home</span>
			</div>
		</Link>
	);
}
