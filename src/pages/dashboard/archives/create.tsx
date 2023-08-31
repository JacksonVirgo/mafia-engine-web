import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import React, { useEffect, useRef, useState } from "react";
import { isInteger } from "~/utils/validation";
import type { Snowflake } from "discord.js";
import { api } from "~/utils/api";
import Spinner from "~/components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const QUEUES = [
	"Main",
	"Special",
	"Newcomer",
	"Community",
	"Extra",
	"Turbo",
] as const;
type Queue = (typeof QUEUES)[number];

type User = [Snowflake, string];

export default function Home() {
	const [archiveName, setSetupName] = useState<string>();
	const [queue, setGameQueue] = useState<Queue>();
	const [gameNumber, setGameNumber] = useState<string>();

	const [mainHosts, setMainHosts] = useState<User[]>();
	const [coHosts, setCoHosts] = useState<User[]>();
	const [players, setPlayers] = useState<string>();

	const [spreadsheetUrl, setSpreadsheetUrl] = useState<string>();

	const [currentTab, setCurrentTab] = useState(0);

	useEffect(() => {
		console.log("Data has changed");
		console.log(gameNumber, isInteger(gameNumber));
	}, [archiveName, queue, gameNumber, coHosts, spreadsheetUrl]);

	return (
		<>
			<Head>
				<title>Mafia Engine - Archives</title>
			</Head>
			<main
				className="flex h-smallview flex-col items-center justify-start bg-background bg-repeat pt-32 text-white dark"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<AbsoluteCopyright />

				<h1 className="mb-2 text-6xl font-extrabold">
					<span className="text-red-400">Create</span> Archive
				</h1>
				<p className="mb-8 text-center">
					This tool is in very early development.
				</p>

				<div className="block p-6 text-center sm:hidden">
					Your screen is too small to view the table, please use a
					larger device.
				</div>

				<div className="flex w-1/2 flex-row gap-2 rounded-xl bg-zinc-700 p-4">
					<div className="flex flex-col gap-2 rounded-xl bg-zinc-600 p-2">
						<div
							onClick={() => setCurrentTab(0)}
							className={`rounded-xl p-2 hover:cursor-pointer ${
								currentTab == 0 ? "bg-zinc-500" : ""
							}`}
						>
							Basic Information
						</div>
						<div
							onClick={() => setCurrentTab(1)}
							className={`rounded-xl p-2 hover:cursor-pointer ${
								currentTab == 1 ? "bg-zinc-500" : ""
							}`}
						>
							Host/s
						</div>
						<div
							onClick={() => setCurrentTab(2)}
							className={`rounded-xl p-2 hover:cursor-pointer  ${
								currentTab == 2 ? "bg-zinc-500" : ""
							}`}
						>
							Players
						</div>
						<div
							onClick={() => setCurrentTab(3)}
							className={`rounded-xl p-2 hover:cursor-pointer ${
								currentTab == 3 ? "bg-zinc-500" : ""
							}`}
						>
							Attached Links
						</div>
					</div>
					<div className="flex grow flex-col gap-4 p-2">
						{currentTab == 0 && (
							<>
								<div className="flex flex-col">
									<label htmlFor="setup-name">
										Setup Name
									</label>
									<input
										id="setup-name"
										name="setup-name"
										type="text"
										placeholder="Setup name"
										className={`mx-2 border-1 p-2 ${
											archiveName != "" &&
											archiveName != undefined
												? "border-zinc-500"
												: "border-red-500"
										}`}
										onChange={(e) =>
											setSetupName(e.target.value)
										}
									/>
								</div>

								<div className="flex flex-col">
									<label htmlFor="setup-queue">Queue</label>

									<select
										onChange={(e) => {
											setGameQueue(
												e.target.value as Queue
											);
										}}
										className="mx-2 border-1 border-zinc-500 p-2"
									>
										{QUEUES.map((queue) => {
											return (
												<option
													key={queue}
													value={queue}
												>
													{queue
														.charAt(0)
														.toUpperCase() +
														queue.slice(1)}
												</option>
											);
										})}
									</select>
								</div>

								<div className="flex flex-col">
									<label htmlFor="setup-game-number">
										Game Number
									</label>
									<input
										id="setup-game-number"
										name="setup-game-number"
										type="number"
										placeholder="Game number"
										className={`mx-2 border-1 p-2 ${
											isInteger(gameNumber)
												? "border-zinc-500"
												: "border-red-500"
										}`}
										onChange={(e) =>
											setGameNumber(e.target.value)
										}
									/>
								</div>
							</>
						)}

						{currentTab == 1 && (
							<>
								<div className="flex flex-col">
									<label htmlFor="setup-hosts">
										Main Host/s
									</label>
									<div className="flex flex-col gap-2 p-2">
										<UserSearchField
											onAddUser={(user) => {
												setMainHosts([
													...(mainHosts ?? []),
													user,
												]);
											}}
										/>

										<ul className="list-disc pl-5">
											{mainHosts?.map(([id, name]) => {
												return (
													<li key={id}>
														{id} - {name}
													</li>
												);
											}) ?? <li>None</li>}
										</ul>
									</div>
								</div>

								<div className="flex flex-col">
									<label htmlFor="setup-cohosts">
										Co-Host/s
									</label>
									<div className="flex flex-col gap-2 p-2">
										<UserSearchField
											onAddUser={(user) => {
												setCoHosts([
													...(coHosts ?? []),
													user,
												]);
											}}
										/>

										<ul className="list-disc pl-5">
											{coHosts?.map(([id, name]) => {
												return (
													<li
														key={id}
														className="flex flex-row items-center justify-start gap-2 align-middle"
													>
														<span className="text-center text-xs">
															{id}
														</span>
														<span>·</span>
														<span>{name}</span>
														<span
															className="text-sm hover:cursor-pointer hover:text-red-500"
															onClick={() => {
																setCoHosts(
																	coHosts?.filter(
																		([
																			hostId,
																			_,
																		]) =>
																			hostId !=
																			id
																	)
																);
															}}
														>
															<FontAwesomeIcon
																icon={faTrash}
															/>
														</span>
													</li>
												);
											}) ?? <li>None</li>}
										</ul>
									</div>
								</div>
							</>
						)}

						{currentTab == 2 && (
							<>
								<div className="flex flex-col">
									<label htmlFor="setup-players">
										Player List
									</label>
									<div className="mx-2 mb-1 text-xs text-zinc-400">
										List of Discord IDs, new line for each.
									</div>
									<textarea
										id="setup-players"
										name="setup-players"
										placeholder="List discord IDs..."
										className={`mx-2 border-1 p-2 ${
											players != "" &&
											players != undefined
												? "border-zinc-500"
												: "border-red-500"
										}`}
										onChange={(e) =>
											setPlayers(e.target.value)
										}
									/>
								</div>
							</>
						)}

						{currentTab == 3 && (
							<>
								<div className="flex flex-col">
									<label htmlFor="setup-spreadsheet">
										Spreadsheet URL
									</label>
									<input
										id="setup-spreadsheet"
										name="setup-spreadsheet"
										type="text"
										placeholder="Spreadsheet URL"
										className={`mx-2 border-1 p-2`}
										onChange={(e) =>
											setSpreadsheetUrl(e.target.value)
										}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</main>
		</>
	);
}

type UserSearchFieldProps = {
	onAddUser?: (user: User) => void;
};
function UserSearchField({ onAddUser }: UserSearchFieldProps) {
	const [discordId, setDiscordId] = useState<string>();
	const userData = api.discord.userData.useMutation();
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const buttonClicked = async () => {
		if (!discordId) return;

		setIsLoading(true);

		const user = await userData.mutateAsync({ id: discordId });
		if (user && onAddUser) {
			onAddUser([user.discordId, user.username]);
			if (inputRef?.current) inputRef.current.value = "";
		}

		setIsLoading(false);
	};

	return (
		<div className="flex w-full flex-row gap-2">
			<input
				type="text"
				placeholder="Discord ID"
				className="grow pl-2"
				onChange={(e) => setDiscordId(e.target.value)}
				ref={inputRef}
			/>

			{!isLoading && (
				<button
					className="border-1 border-zinc-500 bg-zinc-600 p-1 hover:bg-zinc-700"
					onClick={(e) => {
						e.preventDefault();
						buttonClicked().catch(console.log);
					}}
				>
					Add Host
				</button>
			)}

			{isLoading && <Spinner />}
		</div>
	);
}
