import ButtonComponent from "../atoms/ButtonComponent";

interface BookmarkPermissionModalProps {
  onClose: () => void;

}

export const BookmarkPermissionModal: React.FC<BookmarkPermissionModalProps> = ({
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 overflow-visible">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
        <div className="flex flex-col justify-center items-center mb-4">
          <section className=" text-center my-5 py-2">
            <p>No tienes permiso para guardar recursos. Contacta con un administrador.</p>
          </section>
          <ButtonComponent
            type="button"
            variant="primary"
            onClick={onClose}
          >
            Entendido
          </ButtonComponent>
        </div>


      </div>
    </div>
  );
};
