import GitHubLogin from '../github-login/GitHubLogin';
import { useCtxUser } from '../../hooks/useCtxUser';
import closeIcon from '../../../src/assets/close2.svg';

interface ModalProps {
  closeModal: () => void;
  title?: string;
  children?: React.ReactNode;
}
export const Modal = ({ closeModal, title, children }: ModalProps) => {
  const { signIn } = useCtxUser();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
        onClick={handleBackdropClick}>
        <div className="bg-white p-6 rounded-2xl w-[35%] min-h-[30%] relative">
          <button
            className="absolute top-6 right-6 "
            onClick={closeModal}>
            <img
              src={closeIcon}
              alt="Cerrar modal"
              className="w-[21px] h-[19px] "
            />
          </button>
          <div className="flex flex-col justify-center items-center w-full mt-10">
            {title && (
              <h2 className="text-[1.625rem] font-bold mb-10">{title}</h2>
            )}

            {children ? children : <GitHubLogin onClick={signIn} />}
          </div>
        </div>
      </div>
    </>
  );
};
