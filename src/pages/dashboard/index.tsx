import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import InfoPanel from "~/components/InfoPanel";
import MenuBar from "~/components/MenuBar";
import { Loading } from "~/components/subpages/Loading";

import { api } from "~/utils/api";
export default function Home() {
	const perms = api.discord.validatePermissions.useQuery({
		guildId: "648663810772697089",
	});

	if (perms.isLoading) return <Loading />;
	else if (perms.data?.isAdministrator == false) return <p>Not admin</p>;

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
						name="User List"
						info="View data about all stored users. You will be able to assign alt accounts, and change usernames etc."
						internalLink="/dashboard/users"
						linkText="Manage Users"
					/>
				</div>
			</main>
		</>
	);
}
