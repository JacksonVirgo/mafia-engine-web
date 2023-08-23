export function Loading() {
	return (
		<div
			className="absolute bottom-0 top-0 flex h-screen w-screen flex-col justify-center text-white"
			style={{
				backgroundImage: "url(/chalkboard.jpg)",
			}}
		>
			<div className="ml-64 animate-pulse text-xl">
				Loading Content...
			</div>
		</div>
	);
}
