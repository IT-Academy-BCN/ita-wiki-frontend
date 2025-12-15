const CardSkeleton = () => {
	return (
		<li className="flex flex-col w-full py-4 px-4 rounded-2xl shadow-xs border border-[#7E7E7E]">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-pulse">
				<div className="flex flex-col sm:flex-row gap-1">
					<div className="mt-1">
						<div className="w-14 h-6 rounded bg-gray-200" />
					</div>
					<div className="flex flex-col gap-1 mt-2 sm:mt-0">
						<div className="h-4 w-48 max-w-full rounded bg-gray-200" />
						<div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2">
							<div className="flex items-center gap-1">
								<span className="w-4 h-4 rounded-full bg-gray-200" />
								<span className="h-3 w-16 rounded bg-gray-200" />
							</div>
							<div className="flex items-center gap-1">
								<span className="w-4 h-4 rounded-full bg-gray-200" />
								<span className="h-3 w-10 rounded bg-gray-200" />
							</div>
							<div className="flex items-center gap-1">
								<span className="w-4 h-4 rounded-full bg-gray-200" />
								<span className="h-3 w-24 rounded bg-gray-200" />
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-start sm:justify-center w-10 h-10 mt-2 sm:mt-0">
					<div className="w-8 h-8 rounded bg-gray-200" />
				</div>
			</div>
		</li>
	);
};

export default CardSkeleton;
