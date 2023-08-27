import Head from "next/head";
import { useEffect, useState } from "react";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import { api } from "~/utils/api";
import React from "react";
import { Spinner } from "@nextui-org/react";
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

	const archiveQuery = api.discord.archives.useQuery({
		skip: (currentPage - 1) * rowsPerPage,
		take: rowsPerPage,
	});

	useEffect(() => {
		archiveQuery
			.refetch()
			.then((data) => {
				const archiveCount = data.data?.count;
				if (archiveCount && archiveCount > 0)
					setTotalPages(Math.ceil(archiveCount / rowsPerPage));
				if (currentPage > totalPages) setCurrentPage(totalPages);
			})
			.catch(console.log);
	}, [rowsPerPage, currentPage, totalPages, archiveQuery]);

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
					<span className="text-red-400">Archive</span> List
				</h1>
				<p className="mb-16 text-center">
					This tool is in very early development.
				</p>

				<div className="block p-6 text-center sm:hidden">
					Your screen is too small to view the table, please use a
					larger device.
				</div>

				<table className="hidden w-4/5 table-fixed border-2 border-white p-4 text-center text-xs sm:table lg:text-base">
					<thead>
						<tr className="text-md bg-zinc-900">
							<Header name="Handle" />
							<Header name="Name" />
							<Header name="Spreadsheet" />
							<th></th>
						</tr>
					</thead>
					<tbody>
						{archiveQuery.data ? (
							archiveQuery.data.archives.map((archive, index) => {
								const color =
									index % 2 == 0
										? "bg-zinc-500"
										: "bg-zinc-600";
								return (
									<tr
										key={archive.gameHandle}
										className={color}
									>
										<td>{archive.gameHandle}</td>
										<td>{archive.gameTitle}</td>
										<td>{archive.spreadsheetURL}</td>
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
