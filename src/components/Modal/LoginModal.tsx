import closeIcon from "../../assets/close2.svg";
interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl w-[35%] min-w-[300px] max-w-md text-center relative"
        onClick={handleContentClick}
      >
        <button className="absolute top-6 right-6" onClick={onClose}>
          <img
            src={closeIcon}
            alt="Cerrar modal"
            className="w-[21px] h-[19px]"
          />
        </button>
        <h2 className="text-xl font-semibold mb-6 mt-5 mx-2">
          Per accedir a aquesta secció cal iniciar sessió
        </h2>
        <button
          onClick={onClose}
          className="bg-primary text-white px-6 py-3 rounded-[12px] mb-4 mt-2"
        >
          D'acord
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
