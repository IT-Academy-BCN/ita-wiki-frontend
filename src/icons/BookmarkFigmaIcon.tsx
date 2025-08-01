import React from "react";

interface Props {
  className?: string;
}

const BookmarkFigmaIcon: React.FC<Props> = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.007 19.853V6.034C18.0116 5.49905 17.8034 4.98422 17.4283 4.60277C17.0532 4.22131 16.542 4.00449 16.007 4H8.00705C7.4721 4.00449 6.96085 4.22131 6.58577 4.60277C6.2107 4.98422 6.00252 5.49905 6.00705 6.034V19.853C5.95951 20.252 6.15541 20.6407 6.50441 20.8399C6.85342 21.039 7.28773 21.0099 7.60705 20.766L11.407 17.485C11.7496 17.1758 12.2705 17.1758 12.613 17.485L16.4071 20.767C16.7265 21.0111 17.1611 21.0402 17.5102 20.8407C17.8593 20.6413 18.0551 20.2522 18.007 19.853Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BookmarkFigmaIcon;
