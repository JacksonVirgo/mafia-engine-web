import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import HotdogMenuButton from "./navigation/HotdogMenu";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type MenuBarProps = {
	attached?: boolean;
};

type MenuButtonProps = {
	name: string;
	path: string;
	menuPage?: boolean;
	external?: boolean;
};

export default function MenuBar({ attached }: MenuBarProps) {
	const user = useUser();
	const router = useRouter();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [menuItems] = useState<Array<MenuButtonProps>>([
		{
			name: "Home",
			path: "/",
		},
		{
			name: "Downloads",
			path: "/downloads",
		},
		{
			name: "Pricing",
			path: "/pricing",
		},
		{
			name: "Contact",
			path: "/contact",
		},
		{
			name: "Wiki",
			path: "https://discord-mafia-role-cards.fandom.com/wiki/Discord_Mafia_Role_cards_Wiki",
			external: true,
		},
	]);

	return (
		<>
			<div
				className={`hidden w-full flex-row items-center justify-start border-b border-b-white bg-black bg-opacity-30 p-2 align-middle sm:flex ${
					attached ? "" : "absolute left-0 top-0"
				}`}
			>
				<div className="flex grow flex-row gap-2 pl-4">
					<Link href="/">
						<div className="flex aspect-square flex-col justify-center">
							<div className="font-extrabold">
								<span className="text-red-500">M</span>
								<span>E</span>
							</div>
						</div>
					</Link>
					<div className="h-full align-middle font-extrabold">
						&nbsp;
					</div>
					{menuItems.map((item, index) => {
						const { name, path, external } = item;
						return (
							<div
								key={item.name}
								className="flex flex-row gap-2"
							>
								{index != 0 && (
									<div className="h-full align-middle font-extrabold">
										·
									</div>
								)}
								<Link
									href={path}
									className="flex h-full flex-col justify-center"
								>
									<div
										className={`text-center align-middle text-sm hover:cursor-pointer hover:underline ${
											router.pathname == path
												? "underline decoration-red-400 decoration-2 underline-offset-4"
												: ""
										}`}
									>
										{/* <FontAwesomeIcon icon={faHome} /> */}
										<span className="pl-1">{name}</span>
										{external && (
											<FontAwesomeIcon
												icon={faArrowUpRightFromSquare}
												className="scale-75 pl-1"
											/>
										)}
									</div>
								</Link>
							</div>
						);
					})}
				</div>
				{user.isSignedIn && (
					<UserButton
						appearance={{
							baseTheme: dark,
						}}
					/>
				)}
				{!user.isSignedIn && <LoginButton />}
			</div>

			<div
				className="absolute bottom-0 right-0 m-4 flex aspect-square w-10 cursor-default flex-row items-center  justify-center rounded-full bg-red-400 hover:cursor-pointer sm:hidden"
				onClick={() => {
					setIsMenuOpen(true);
				}}
			>
				<HotdogMenuButton />
			</div>

			<MenuBarPage
				pageActive={isMenuOpen}
				onExit={() => {
					setIsMenuOpen(false);
				}}
			/>
		</>
	);
}

export function MenuButton({
	name,
	path,
	menuPage,
	external,
}: MenuButtonProps) {
	const router = useRouter();

	if (menuPage)
		return (
			<Link href={path}>
				<div
					className={`items-center rounded-full bg-opacity-100 p-1 px-4 text-center align-middle text-3xl  hover:bg-white hover:bg-opacity-10 hover:underline ${
						router.pathname == path ? "font-extrabold" : ""
					}`}
				>
					<span className="pl-1">{name}</span>
					{external && (
						<FontAwesomeIcon
							icon={faArrowUpRightFromSquare}
							className="scale-50 pl-2"
						/>
					)}
				</div>
			</Link>
		);
	return (
		<Link href={path}>
			<li
				className={`items-center rounded-full bg-opacity-100 p-1 px-4 text-center align-middle text-sm  hover:bg-white hover:bg-opacity-10 hover:underline ${
					router.pathname == path ? "bg-white bg-opacity-25" : ""
				}`}
			>
				{/* <FontAwesomeIcon icon={faHome} /> */}
				<span className="pl-1">{name}</span>
				{external && (
					<FontAwesomeIcon
						icon={faArrowUpRightFromSquare}
						className="scale-75 pl-1"
					/>
				)}
			</li>
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

type MenuBarPageProps = {
	pageActive: boolean;
	onExit: () => void;
};
function MenuBarPage({ pageActive, onExit }: MenuBarPageProps) {
	const user = useUser();
	// const router = useRouter();
	if (!pageActive) return null;

	return (
		<div className="absolute top-0 z-20 flex h-full w-full flex-col items-center justify-center bg-zinc-700 text-center">
			<div className="absolute right-0 top-0 m-4 flex flex-row items-center justify-end text-center">
				<div onClick={onExit}>
					<FontAwesomeIcon icon={"circle-xmark"} size="2x" />
				</div>
			</div>

			<MenuButton name="Home" path="/" menuPage={true} />
			<MenuButton name="Downloads" path="/downloads" menuPage={true} />
			<MenuButton name="Pricing" path="/pricing" menuPage={true} />
			<MenuButton name="Contact" path="/contact" menuPage={true} />

			{/* {user.isSignedIn && router.pathname !== "/dashboard" && (
				<>
					<MenuButton
						name="Dashboard"
						path="/dashboard"
						menuPage={true}
					/>
				</>
			)} */}

			{!user.isSignedIn && (
				<>
					<MenuButton name="Login" path="/login" menuPage={true} />
				</>
			)}
		</div>
	);
}
