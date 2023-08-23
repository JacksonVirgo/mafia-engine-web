import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuBar() {
	const user = useUser();
	const router = useRouter();

	// TODO:
	// Remove HOME when at HOME
	// Add LOGIN when not logged in
	// Add DASHBOARD when logged in and not at DASHBOARD

	return (
		<div className="absolute left-0 top-0 flex w-full flex-row items-center justify-start border-b border-b-white bg-black bg-opacity-30 p-2 align-middle">
			<MenuButton name="Home" path="/" />
			<MenuButton name="Contact" path="/contact" />
			<MenuButton name="Downloads" path="/downloads" />

			{user.isSignedIn && router.pathname !== "/dashboard" && (
				<MenuButton name="Dashboard" path="/dashboard" />
			)}
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

type MenuButtonProps = {
	name: string;
	path: string;
};
export function MenuButton({ name, path }: MenuButtonProps) {
	return (
		<Link href={path}>
			<div className="items-center rounded-full bg-opacity-100 p-1 px-4 text-center align-middle text-sm  hover:bg-white hover:bg-opacity-10 hover:underline">
				{/* <FontAwesomeIcon icon={faHome} /> */}
				<span className="pl-1">{name}</span>
			</div>
		</Link>
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
