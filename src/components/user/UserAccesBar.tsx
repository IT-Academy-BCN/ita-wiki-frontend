import { FC } from "react";
import { useUserCtx } from "../../hooks/useUserCtx";
import GitHubLogin from "../github-login/GitHubLogin";

const UserAccesBar: FC = () => {
  const { signOut, user, signIn, error } = useUserCtx();
  return user ? (
    <article
      id={String(user.id)}
      className="flex justify-evenly items-center gap-4 mt-4 py-2 px-4 rounded-md bg-black text-white mx-auto"
    >
      <img
        src={user.photoURL}
        alt="Avatar usuario"
        width={64}
        height={64}
        className="rounded-full border-2 border-white"
      />
      <div className="flex flex-col divide-y-2">
        <small className="font-bold" style={{ textTransform: "uppercase" }}>
          {user.displayName}
        </small>
        <small className="font-bold" style={{ textTransform: "uppercase" }}>
          {user.role}
        </small>
      </div>
      <button
        className="bg-white text-red-500 text-sm font-bold active:scale-95 py-1 px-4 rounded-sm border-2 border-black"
        type="button"
        onClick={signOut}
      >
        Exit
      </button>
    </article>
  ) : (
    <article className="flex flex-col items-center gap-4">
      <span className="text-[#7E7E7E] text-lg text-center">
        Registrate o haz login para poder subir y votar recursos
      </span>
      <div className="flex flex-col max-w-[320px] gap-4">
        <GitHubLogin onClick={signIn} />
        {error && (
          <div className="error-message text-red-500 my-4">{error}</div>
        )}
      </div>
    </article>
  );
};

export default UserAccesBar;
