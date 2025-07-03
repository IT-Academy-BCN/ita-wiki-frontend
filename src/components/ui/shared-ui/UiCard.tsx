import { FC, ReactNode } from "react";

interface UiCardProps {
  children: ReactNode;
  className?: string;
  testId?: string;
}

const UiCard: FC<UiCardProps> = ({ children, className = "", testId }) => {
  return (
    <div
      data-testid={testId || "ui-card"}
      className={`bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 ${className}`}
    >
      {children}
    </div>
  );
};

export default UiCard;
