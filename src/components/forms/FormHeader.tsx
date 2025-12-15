import { ArrowLeftIcon } from "lucide-react";

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
          <a className="text-[#B91879] cursor-pointer" onClick={onCancel}>
            <ArrowLeftIcon className="inline text-[#B91879] mb-2 me-1" />
            {textBack}
          </a>
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>

        <div className="flex items-center justify-end mt-4 sm:mt-0 gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-400 rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer"
          >
            Cancel·lar
          </button>
          <button
            onClick={onPublish}
            className="px-4 py-2 bg-primary text-white rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer"
          >
            Publicar
          </button>
        </div>
      </div>
      <div className="border-t border-gray-300 my-8"></div>
    </>
  );
};

export default FormHeader;
