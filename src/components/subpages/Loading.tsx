import Spinner from "../Spinner";

export function Loading() {
	return (
		<div
			className="absolute bottom-0 top-0 flex h-screen w-screen flex-col justify-center text-white"
			style={{
				backgroundImage: "url(/chalkboard.jpg)",
			}}
		>
			<div className="flex w-full flex-row justify-center">
				<span className="scale-150 animate-pulse">
					<Spinner />
				</span>
			</div>
		</div>
	);
}
