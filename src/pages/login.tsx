import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import MenuBar from "~/components/MenuBar";

export default function Home() {
	return (
		<>
			<main
				className="flex h-screen flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<p>
					<SignIn
						appearance={{
							baseTheme: dark,
						}}
					/>
				</p>
			</main>
		</>
	);
}
