import { ReactNode } from "react";

interface AccessProps {
  children?: ReactNode;
}

const Access: React.FC<AccessProps> = ({ children }) => {
  return children;
};

export default Access;
