import { ArrowLeftIcon } from "lucide-react";
import ButtonComponent from "../atoms/ButtonComponent";

interface FormHeaderProps {
  onCancel: () => void;
  onPublish: () => void;
  textBack: string;
  title: string;
}

const FormHeader = ({
  onCancel,
  onPublish,
  textBack,
  title,
}: FormHeaderProps) => {
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between px-4 sm:px-10">
        <div>
          <button
            className="text-[#B91879] cursor-pointer mb-2 text-sm"
            onClick={onCancel}
            type="button"
          >
            <ArrowLeftIcon className="inline text-[#B91879] me-1" size={16} />
            {textBack}
          </button>
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>

        <div className="flex items-center justify-end mt-4 sm:mt-0 gap-4">
          <ButtonComponent onClick={onCancel} variant="secondary">
            Cancel·lar
          </ButtonComponent>
          <ButtonComponent onClick={onPublish}>Publicar</ButtonComponent>
        </div>
      </div>
      <div className="border-t border-gray-300 my-8"></div>
    </>
  );
};

export default FormHeader;
