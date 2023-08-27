import Head from "next/head";
import { AbsoluteCopyright } from "~/components/Copyright";
import MenuBar from "~/components/MenuBar";
import React, { useState } from "react";
import { api } from "~/utils/api";

const ALIGNMENTS = ["Town", "Mafia", "Coven", "Neutral"] as const;
type Alignment = (typeof ALIGNMENTS)[number];
type NonNeutralAlignment = Exclude<Alignment, "Neutral">;
const winConditions: Record<NonNeutralAlignment, string> = {
	Town: "You win when there are no longer any threats to the Town.",
	Mafia: "You win when everyone who opposes the Mafia has died.",
	Coven: "You win when everyone who opposes the Coven has died.",
};

const SUB_ALIGNMENTS = [
	"Citizen",
	"Killing",
	"Protective",
	"Investigative",
	"Support",
	"Power",
	"Deception",
	"Head",
	"Tactical",
	"Goon",
	"Espionage",
	"Evil",
	"Chaos",
	"Benign",
] as const;
type SubAlignment = (typeof SUB_ALIGNMENTS)[number];

export default function Home() {
	const [roleName, setRoleName] = useState<string>();
	const [roleAlignment, setRoleAlignment] = useState<Alignment>("Town");
	const [roleSubAlignment, setRoleSubAlignment] =
		useState<SubAlignment>("Citizen");
	const [roleAbilities, setRoleAbilities] = useState<string>();
	const [roleWinCondition, setRoleWinCondition] = useState<string>();

	const [roleFlavourText, setRoleFlavourText] = useState<string>();
	const [roleColour, setRoleColour] = useState<string>();
	const [roleWikiUrl, setRoleWikiUrl] = useState<string>();

	const createRole = api.roles.createRole.useMutation();

	// Just to remove the ESLint errors

	const onFormSubmit = async () => {
		console.log("FORM SUBMITTED");

		console.log(roleName, roleAlignment, roleSubAlignment, roleAbilities);
		if (!(roleName && roleAlignment && roleSubAlignment && roleAbilities))
			return;

		const winCondition =
			roleAlignment === "Neutral"
				? roleWinCondition
				: winConditions[roleAlignment];

		console.log(winCondition);
		if (!winCondition) return;

		// Grey hex color
		let newRoleColour = roleColour;
		if (roleAlignment == "Town") newRoleColour = "#00BF00";
		else if (roleAlignment == "Mafia") newRoleColour = "#BF0000";
		else if (roleAlignment == "Coven") newRoleColour = "#BF00BF";
		else if (!newRoleColour) newRoleColour = "#808080";

		const regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
		if (!regex.test(newRoleColour)) {
			newRoleColour = "#808080";
		}

		const flavourText = roleFlavourText ?? undefined;
		const wikiUrl = roleWikiUrl ?? undefined;

		const role = await createRole.mutateAsync({
			name: roleName,
			alignment: roleAlignment,
			subAlignment: roleSubAlignment,
			abilities: roleAbilities,
			winCondition: winCondition,
			flavour: flavourText,
			color: newRoleColour,
			wiki: wikiUrl,
		});

		if (role) window.location.reload();
	};

	return (
		<>
			<Head>
				<title>Mafia Engine - Role Creation</title>
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
					<span className="text-red-400">Role</span> Form
				</h1>

				<form
					className="flex w-2/3 flex-col"
					onSubmit={(e) => {
						e.preventDefault();
						onFormSubmit().catch(console.log);
					}}
				>
					<label htmlFor="role-name">Role Name</label>
					<input
						id="role-name"
						name="role-name"
						type="text"
						placeholder="Enter a role name..."
						className="ml-4 border-1 border-zinc-500 p-2"
						onChange={(e) => setRoleName(e.target.value)}
					/>

					<label htmlFor="role-alignment">Alignment</label>
					<select
						id="role-alignment"
						name="role-alignment"
						onChange={(e) =>
							setRoleAlignment(e.target.value as Alignment)
						}
						className="ml-4 p-2"
					>
						{ALIGNMENTS.map((alignment) => {
							return (
								<option key={alignment} value={alignment}>
									{alignment.charAt(0).toUpperCase() +
										alignment.slice(1)}
								</option>
							);
						})}
					</select>

					<label htmlFor="role-sub-alignment">Sub-alignment</label>
					<select
						id="role-sub-alignment"
						name="role-sub-alignment"
						className="ml-4 p-2"
						onChange={(e) =>
							setRoleSubAlignment(e.target.value as SubAlignment)
						}
					>
						{SUB_ALIGNMENTS.map((subAlignment) => {
							return (
								<option key={subAlignment} value={subAlignment}>
									{subAlignment.charAt(0).toUpperCase() +
										subAlignment.slice(1)}
								</option>
							);
						})}
					</select>

					<label htmlFor="role-abilities">Abilities</label>
					<textarea
						id="role-abilities"
						name="role-abilities"
						placeholder="Enter the abilities of the role here..."
						className="ml-4 h-64 border-1 border-zinc-500 p-2"
						onChange={(e) => setRoleAbilities(e.target.value)}
					/>

					<label htmlFor="role-win-condition">Win condition</label>
					<input
						id="role-win-condition"
						name="role-win-condition"
						type="text"
						placeholder="Shoot an evil bitch until all the evil bitches are dead"
						disabled={roleAlignment != "Neutral"}
						className={`ml-4 border-1 border-zinc-500 p-2 ${
							roleAlignment === "Neutral" ? "block" : "hidden"
						}`}
						onChange={(e) => setRoleWinCondition(e.target.value)}
					/>
					<div
						className={`ml-4 bg-zinc-500 ${
							roleAlignment !== "Neutral" ? "block" : "hidden"
						}`}
					>
						{roleAlignment && roleAlignment != "Neutral"
							? winConditions[roleAlignment]
							: "Custom"}
					</div>

					<label htmlFor="role-flavour">Flavour Text</label>
					<input
						id="role-flavour"
						name="role-flavour"
						type="text"
						placeholder="Enter the flavour text..."
						className="ml-4 border-1 border-zinc-500 p-2"
						onChange={(e) => setRoleFlavourText(e.target.value)}
					/>

					<label htmlFor="role-colour">Colour #F0F0F0</label>
					<input
						id="role-colour"
						name="role-colour"
						type="text"
						placeholder="Enter the role colour here..."
						className="ml-4 border-1 border-zinc-500 p-2"
						onChange={(e) => setRoleColour(e.target.value)}
					/>

					<label htmlFor="role-link">Wiki URL</label>
					<input
						id="role-link"
						name="role-link"
						type="text"
						placeholder="Enter the wiki URL here..."
						className="ml-4 border-1 border-zinc-500 p-2"
						onChange={(e) => setRoleWikiUrl(e.target.value)}
					/>

					<div className="mt-4 flex w-full flex-row justify-center">
						<input
							type="submit"
							value="Create"
							className="ml-4 w-32 border-1 border-zinc-500 p-2 hover:cursor-pointer hover:bg-zinc-500"
						/>
					</div>
				</form>
			</main>
		</>
	);
}
