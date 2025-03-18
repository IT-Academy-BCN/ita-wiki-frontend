import GitHubLogin from "../github-login/GitHubLogin";
import { useCtxUser } from "../../hooks/useCtxUser";

interface ModalProps {
  closeModal: () => void;
  title?: string;
  children?: React.ReactNode;
}
export const Modal = ({ closeModal, title, children }: ModalProps) => {
  const { signIn } = useCtxUser();

  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
        <div className="bg-white p-6 rounded-2xl w-[35%] h-[35%] relative">
          <button
            className="absolute top-4 right-4 text-xl font-bold text-black"
            onClick={closeModal}
          >
            X
          </button>
          <div className="flex flex-col justify-center items-center w-full mt-10">
            {title && <h2 className="text-xl font-bold mb-10">{title}</h2>}

            {children ? children : <GitHubLogin onClick={signIn} />}
          </div>
        </div>
      </div>
    </>
  );
};
