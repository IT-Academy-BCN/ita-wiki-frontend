import React from "react";
import type { ProgressBarProps } from "./types/projectTypes";

const ProgressBar: React.FC<ProgressBarProps> = ({ startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  const total = end.getTime() - start.getTime();
  const elapsed = today.getTime() - start.getTime();
  const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
        <span>
          {start.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
        <span>
          {end.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
      </div>

      <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-2 bg-primary rounded-full transition-all duration-700"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
