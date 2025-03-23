import React from "react";

interface AccessProps {
  children?: React.ReactNode;
}

const Access: React.FC<AccessProps> = ({ children }) => {
  return <>{children}</>;
};

export default Access;
