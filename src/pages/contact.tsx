import Head from "next/head";
import { type FormEvent, useState } from "react";
import MenuBar from "~/components/MenuBar";
import Spinner from "~/components/Spinner";
import { api } from "~/utils/api";

export default function Home() {
	const sendWebhook = api.contact.useMutation();

	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	const [responded, setResponded] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const formSubmission = async (e: FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		const response = await sendWebhook.mutateAsync({
			title,
			message,
		});

		if (response.success) {
			setResponded("Thanks for submitting");
		} else setResponded("An error has occurred, please try again later");
	};

	return (
		<>
			<Head>
				<title>Mafia Engine - Contact</title>
			</Head>
			<main
				className="flex h-screen flex-col items-center justify-center bg-repeat pb-16 text-white"
				style={{
					backgroundImage: "url(/chalkboard.jpg)",
				}}
			>
				<MenuBar />
				<h1 className="mb-2 mt-24 text-center text-6xl font-extrabold">
					<span className="text-red-400">Contact</span> Form
				</h1>

				{isLoading && responded == "" && <Spinner />}
				{responded != "" && <div>{responded}</div>}
				{!responded && !isLoading && (
					<form
						onSubmit={(e) => {
							formSubmission(e).catch(console.log);
						}}
						className="flex w-96 flex-col text-lg "
					>
						<label htmlFor="subject">Subject</label>
						<input
							type="text"
							id="subject"
							name="subject"
							required
							maxLength={40}
							onChange={(e) => setTitle(e.target.value)}
							className="0 rounded-md border border-zinc-300 bg-black bg-opacity-25 p-2 text-sm outline-none"
						/>
						<label htmlFor="message">Message</label>
						<textarea
							id="message"
							name="message"
							maxLength={1024}
							required
							onChange={(e) => setMessage(e.target.value)}
							className="h-96 resize-none rounded-md border border-zinc-300 bg-black bg-opacity-25 p-2 text-sm outline-none"
						/>
						<div className="mt-2 flex w-full flex-row justify-center">
							<button
								type="submit"
								className="w-1/2 rounded-full border border-white bg-opacity-100 p-1 px-4 text-center hover:bg-white hover:bg-opacity-10 hover:underline"
							>
								Submit
							</button>
						</div>
					</form>
				)}
			</main>
		</>
	);
}
