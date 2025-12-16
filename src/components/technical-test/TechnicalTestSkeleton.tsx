const CardSkeleton = () => {
  return (
    <li className="flex flex-col w-full py-7 px-4 ring ring-gray-900/5 rounded-2xl shadow-md bg-gray-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-pulse">
        <div className="flex flex-col sm:flex-row gap-1">
          <div className="">
            <div className="w-14 h-6 rounded bg-gray-300" />
          </div>
          <div className="flex flex-col flex-1 gap-1 mt-2 sm:mt-0">
            <div className="h-6 w-110 max-w-full rounded bg-gray-300" />
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2">
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-gray-300" />
                <span className="h-3 w-16 rounded bg-gray-300" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-gray-300" />
                <span className="h-3 w-10 rounded bg-gray-300" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-gray-300" />
                <span className="h-3 w-24 rounded bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start sm:justify-center w-10 h-10 mt-2 sm:mt-0">
          <div className="w-8 h-8 rounded bg-gray-300" />
        </div>
      </div>
    </li>
  );
};

export default CardSkeleton;
