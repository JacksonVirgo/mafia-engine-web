type InfoPanelProps = {
	name: string;
	info: string;
	link: string;
	linkText: string;
};

export default function InfoPanel({
	name,
	info,
	link,
	linkText,
}: InfoPanelProps) {
	const onClick = () => {
		window.open(link);
	};

	return (
		<div
			className={`flex aspect-square h-44 flex-col overflow-hidden rounded-md border border-zinc-300 transition-all hover:cursor-pointer sm:h-60 sm:hover:scale-110`}
			onClick={onClick}
		>
			<div className="flex flex-row items-center gap-2 bg-zinc-800 p-2 pl-4  align-middle">
				<span className="text-md sm:text-lg">{name}</span>
			</div>
			<div className="grow">
				<div className="mx-3 mt-3 text-xs sm:mx-6 sm:mt-6 sm:text-sm">
					{info}
				</div>
			</div>
			<a
				href={link}
				className="mb-4 text-center text-xs underline hover:text-red-500 sm:text-sm"
			>
				{linkText}
			</a>
		</div>
	);
}
