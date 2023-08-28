import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import React, { useEffect, useState } from "react";
import { isInteger } from "~/utils/validation";

const QUEUES = [
	"Main",
	"Special",
	"Newcomer",
	"Community",
	"Extra",
	"Turbo",
] as const;
type Queue = (typeof QUEUES)[number];

export default function Home() {
	const [archiveName, setSetupName] = useState<string>();
	const [queue, setGameQueue] = useState<Queue>();
	const [gameNumber, setGameNumber] = useState<string>();

	const [mainHosts, setMainHosts] = useState<string>();
	const [coHosts, setCoHosts] = useState<string>();
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
									<div className="mx-2 mb-1 text-xs text-zinc-400">
										List of Discord IDs, new line for each.
									</div>
									<textarea
										id="setup-hosts"
										name="setup-hosts"
										placeholder="List discord IDs..."
										className={`mx-2 border-1 p-2 ${
											mainHosts != "" &&
											mainHosts != undefined
												? "border-zinc-500"
												: "border-red-500"
										}`}
										onChange={(e) =>
											setMainHosts(e.target.value)
										}
									/>
								</div>

								<div className="flex flex-col">
									<label htmlFor="setup-cohosts">
										Co-Host/s
									</label>
									<div className="mx-2 mb-1 text-xs text-zinc-400">
										List of Discord IDs, new line for each.
									</div>
									<textarea
										id="setup-cohosts"
										name="setup-cohosts"
										placeholder="List discord IDs..."
										className={`mx-2 border-1 p-2`}
										onChange={(e) =>
											setCoHosts(e.target.value)
										}
									/>
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
