import Head from "next/head";
import { useEffect, useState } from "react";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import { api } from "~/utils/api";
import React from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPenToSquare,
	faX,
	faAnglesRight,
	faAnglesLeft,
	faAngleLeft,
	faAngleRight,
	faChevronDown,
	faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
	const [rowsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const [sort, setSort] = useState<"asc" | "desc" | undefined>(undefined);
	const [sortBy, setSortBy] = useState<"id" | "username">("id");

	const [nameSearch, setNameSearch] = useState<string | undefined>();
	const [idSearch, setIDSearch] = useState<string | undefined>();

	const userQuery = api.discord.users.useQuery({
		skip: (currentPage - 1) * rowsPerPage,
		take: rowsPerPage,
		sortBy: sortBy,
		sort: sort,
		search: nameSearch,
		idSearch: idSearch,
	});

	const getBlankArray = () => {
		const arr = [];
		for (let i = 0; i < rowsPerPage; i++) {
			arr.push(i);
		}
		return arr;
	};

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
				className="flex h-smallview flex-col items-center justify-start bg-background bg-repeat pt-32 text-white dark"
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

				<div className="mb-2 hidden w-4/5 sm:block">
					<input
						defaultValue={""}
						onChange={(e) => {
							setIDSearch(e.target.value);
						}}
						className={`w-64 rounded-lg bg-zinc-600 p-2`}
						placeholder="Search by discord ID"
					/>
				</div>

				<div className="mb-2 hidden w-4/5 sm:block">
					<input
						defaultValue={""}
						onChange={(e) => {
							setNameSearch(e.target.value);
						}}
						className="w-64 rounded-lg bg-zinc-600 p-2"
						placeholder="Search by username"
					/>
				</div>

				<table className="hidden w-4/5 table-fixed border-2 border-white p-4 text-center text-xs sm:table lg:text-base">
					<thead>
						<tr className="text-md bg-zinc-900">
							<Header
								name="ID"
								isFocused={sortBy == "id"}
								sort={sort}
								onClick={() => {
									if (sortBy == "id") {
										if (sort == "asc") setSort("desc");
										else if (sort == "desc")
											setSort(undefined);
										else if (sort == undefined)
											setSort("asc");
									} else {
										if (sort === undefined) setSort("asc");
										setSortBy("id");
									}
								}}
							/>
							<Header
								name="Username"
								isFocused={sortBy == "username"}
								sort={sort}
								onClick={() => {
									if (sortBy == "username") {
										if (sort == "asc") setSort("desc");
										else if (sort == "desc")
											setSort(undefined);
										else if (sort == undefined)
											setSort("asc");
									} else {
										if (sort === undefined) setSort("asc");
										setSortBy("username");
									}
								}}
							/>
							<Header name="MVP" />
							<th></th>
						</tr>
					</thead>
					<tbody>
						{userQuery.data
							? userQuery.data.users.map((user, index) => {
									const color =
										index % 2 == 0
											? "bg-zinc-500"
											: "bg-zinc-600";
									return (
										<tr
											key={user.discordId}
											className={color}
										>
											<td>{user.discordId}</td>
											<td>{user.username}</td>
											<td>{user.mvpStatus}</td>
											<td className="flex flex-row justify-center gap-2 p-2">
												<FontAwesomeIcon
													icon={faPenToSquare}
													className="hover:cursor-pointer"
												/>
												<FontAwesomeIcon
													icon={faX}
													className="text-red-500 hover:cursor-pointer"
												/>
											</td>
										</tr>
									);
							  })
							: getBlankArray().map((v, index) => {
									const color =
										index % 2 == 0
											? "bg-zinc-500"
											: "bg-zinc-600";

									return (
										<tr key={v} className={color}>
											<td>
												<span className="w-full animate-pulse rounded-md bg-zinc-400 text-zinc-400">
													416757703516356628
												</span>
											</td>
											<td>
												<span className="w-full animate-pulse rounded-md bg-zinc-400 text-zinc-400">
													416757703516356628
												</span>
											</td>
											<td>
												<span className="w-full animate-pulse rounded-md bg-zinc-400 text-zinc-400">
													416757703516356628
												</span>
											</td>
											<td className="flex flex-row justify-center gap-2 p-2">
												<FontAwesomeIcon
													icon={faPenToSquare}
													className="opacity-0 hover:cursor-pointer"
												/>
												<FontAwesomeIcon
													icon={faX}
													className="opacity-0 hover:cursor-pointer"
												/>
											</td>
										</tr>
									);
							  })}
					</tbody>
				</table>

				<div className="mt-2 hidden flex-row justify-center sm:flex">
					<PaginationButton
						icon={faAnglesLeft}
						isDisabled={currentPage === 1}
						onClick={() => {
							setCurrentPage(1);
						}}
					/>
					<PaginationButton
						icon={faAngleLeft}
						isDisabled={currentPage === 1}
						onClick={() => {
							setCurrentPage(Math.max(currentPage - 1, 1));
						}}
					/>
					<span className="flex aspect-square h-full flex-col justify-center rounded-2xl bg-zinc-500 p-2 text-center">
						{currentPage}
					</span>
					<PaginationButton
						icon={faAngleRight}
						isDisabled={currentPage === totalPages}
						onClick={() => {
							setCurrentPage(
								Math.min(currentPage + 1, totalPages)
							);
						}}
					/>
					<PaginationButton
						icon={faAnglesRight}
						isDisabled={currentPage === totalPages}
						onClick={() => {
							setCurrentPage(totalPages);
						}}
					/>
				</div>
			</main>
		</>
	);
}

type HeaderProps = {
	onClick?: () => void;
	name: string;
	isFocused?: boolean;
	sort?: "asc" | "desc";
};
function Header({ name, onClick, isFocused, sort }: HeaderProps) {
	return (
		<th
			onClick={onClick}
			className="hover:cursor-pointer hover:select-none"
		>
			<span>{name}</span>
			{isFocused && sort && (
				<FontAwesomeIcon
					icon={sort == "desc" ? faChevronDown : faChevronUp}
				/>
			)}
		</th>
	);
}

type PaginationButtonProps = {
	icon: IconDefinition;
	onClick?: () => void;
	isDisabled?: boolean;
};
function PaginationButton({
	icon,
	onClick,
	isDisabled,
}: PaginationButtonProps) {
	return (
		<div
			className={`flex aspect-square h-full flex-col justify-center rounded-full bg-red-400 bg-opacity-0 text-center transition-all duration-75 hover:select-none ${"hover:cursor-pointer hover:bg-opacity-25"}`}
			onClick={onClick}
		>
			<FontAwesomeIcon
				icon={icon}
				size="2x"
				className={isDisabled ? "text-zinc-500" : "text-white"}
			/>
		</div>
	);
}
