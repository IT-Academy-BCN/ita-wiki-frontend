import { FC, useState } from "react";
import GitHubLogin from "../github-login/GitHubLogin";
import Terms from "./Terms";
import ErroroAccess from "./ErrorAccess";
import { useGlobalCtx } from "../../hooks/useGlobalCtx";
import { useUserCtx } from "../../hooks/useUserCtx";

const SignIn: FC = () => {
  const { signIn } = useUserCtx();
  const { isCheckedTerms } = useGlobalCtx();
  const [loginError, setLoginError] = useState(false);

  const handleSignIn = async () => {
    if (!isCheckedTerms) {
      setLoginError(true);
      return;
    }
    try {
      signIn();
    } catch {
      setLoginError(true);
    }
  };
  return (
    <>
      <GitHubLogin onClick={handleSignIn} />
      <Terms />
      <ErroroAccess loginError={loginError} />
    </>
  );
};

export default SignIn;
