import Head from "next/head";
import { useEffect, useState } from "react";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import { api } from "~/utils/api";
import React from "react";
import { Spinner } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
	const [rowsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const userQuery = api.discord.users.useQuery({
		skip: (currentPage - 1) * rowsPerPage,
		take: rowsPerPage,
	});

	useEffect(() => {
		userQuery
			.refetch()
			.then((data) => {
				const userCount = data.data?.count;
				if (userCount && userCount > 0)
					setTotalPages(Math.ceil(userCount / rowsPerPage));
				if (currentPage > totalPages) setCurrentPage(totalPages);
			})
			.catch(console.log);
	}, [rowsPerPage, currentPage, totalPages, userQuery]);

	return (
		<>
			<Head>
				<title>Mafia Engine - Dashboard</title>
			</Head>
			<main
				className="flex h-smallview flex-col items-center justify-center bg-background bg-repeat text-white dark"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<AbsoluteCopyright />

				<h1 className="mb-2 text-6xl font-extrabold">
					<span className="text-red-400">User</span> List
				</h1>
				<p className="mb-16 text-center">
					This tool is in very early development.
					<br />
					All this data is READ ONLY
				</p>

				<div className="block p-6 text-center sm:hidden">
					Your screen is too small to view the table, please use a
					larger device.
				</div>

				<table className="hidden w-4/5 table-fixed border-2 border-white p-4 text-center text-xs sm:table lg:text-base">
					<thead>
						<tr className="text-md bg-zinc-900">
							<th className="p-2">ID</th>
							<th>Username</th>
							<th>MVP</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{userQuery.data ? (
							userQuery.data.users.map((user, index) => {
								const color =
									index % 2 == 0
										? "bg-zinc-500"
										: "bg-zinc-600";
								return (
									<tr key={user.discordId} className={color}>
										<td>{user.discordId}</td>
										<td>{user.username}</td>
										<td>{user.mvpStatus}</td>
										<td className="flex flex-row justify-center gap-2 p-2">
											<FontAwesomeIcon
												icon={"pen-to-square"}
												className="hover:cursor-pointer"
											/>
											<FontAwesomeIcon
												icon={"x"}
												className="text-red-500 hover:cursor-pointer"
											/>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td
									colSpan={4}
									className="bg-color bg-zinc-600"
								>
									<Spinner color="white" />
								</td>
							</tr>
						)}
					</tbody>
				</table>

				<div className="mt-2 hidden flex-row justify-center sm:flex">
					<span
						className="flex aspect-square h-full flex-col justify-center rounded-full bg-red-400 bg-opacity-0 text-center transition-all duration-75 hover:cursor-pointer hover:select-none hover:bg-opacity-25"
						onClick={() => {
							setCurrentPage(1);
						}}
					>
						<FontAwesomeIcon icon={"angles-left"} size="2x" />
					</span>
					<span
						className="flex aspect-square h-full flex-col justify-center rounded-full bg-red-400 bg-opacity-0 text-center transition-all duration-75 hover:cursor-pointer hover:select-none hover:bg-opacity-25"
						onClick={() => {
							setCurrentPage(Math.max(currentPage - 1, 1));
						}}
					>
						<FontAwesomeIcon icon={"angle-left"} size="2x" />
					</span>
					<span className="flex aspect-square h-full flex-col justify-center rounded-2xl bg-zinc-500 p-2 text-center">
						{currentPage}
					</span>

					<span
						className="flex aspect-square h-full flex-col justify-center rounded-full bg-red-400 bg-opacity-0 text-center transition-all duration-75 hover:cursor-pointer hover:select-none hover:bg-opacity-25"
						onClick={() => {
							setCurrentPage(
								Math.min(currentPage + 1, totalPages)
							);
						}}
					>
						<FontAwesomeIcon icon={"angle-right"} size="2x" />
					</span>
					<span
						className="flex aspect-square h-full flex-col justify-center rounded-full bg-red-400 bg-opacity-0 text-center transition-all duration-75 hover:cursor-pointer hover:select-none hover:bg-opacity-25"
						onClick={() => {
							setCurrentPage(
								Math.min(currentPage + 1, totalPages)
							);
						}}
					>
						<FontAwesomeIcon icon={"angles-right"} size="2x" />
					</span>
				</div>
			</main>
		</>
	);
}
