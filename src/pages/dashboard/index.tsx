import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { AbsoluteCopyright } from "~/components/Copyright";
import InfoPanel from "~/components/InfoPanel";
import MenuBar from "~/components/MenuBar";
import { Loading } from "~/components/subpages/Loading";

export default function Home() {
	const user = useUser();
	const router = useRouter();

	if (user.isLoaded && !user.isSignedIn) {
		router.push("/login").catch(() => console.log("oop"));
	} else if (!user.isLoaded) {
		return <Loading />;
	}

	return (
		<>
			<Head>
				<title>Mafia Engine - Dashboard</title>
			</Head>
			<main
				className="flex h-smallview flex-col items-center justify-center bg-repeat text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<AbsoluteCopyright />

				<h1 className="mb-2 text-6xl font-extrabold">
					<span className="text-red-400">Dash</span>board
				</h1>
				<div className="mx-2 my-8 flex flex-row flex-wrap justify-center gap-4 sm:mx-0">
					<InfoPanel
						name="Users"
						info="View data about all stored users. You will be able to assign alt accounts, and change usernames etc."
						internalLink="/dashboard/users"
						linkText="Manage Users"
					/>

					<InfoPanel
						name="Archives"
						info="View data about all stored archives. You will be able to create new archives and edit old ones"
						internalLink="/dashboard/archives"
						linkText="Manage Archives"
					/>

					<InfoPanel
						name="Roles"
						info="Create a new role"
						internalLink="/dashboard/roles"
						linkText="Create Role"
					/>
				</div>
			</main>
		</>
	);
}
