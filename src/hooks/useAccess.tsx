import { useState } from "react";

export interface AccessProps {
  isCheckedTerms: boolean;
  loginError: boolean;
  handleCheckboxChange: () => void;
}

export const useAccess = () => {
  const [isCheckedTerms, setIsChecked] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(() => !isCheckedTerms);
    setLoginError(() => false);
  };



  return { isCheckedTerms, loginError, handleCheckboxChange } as AccessProps
}