import { EnuModalKeys } from "../../enums";
import { useGlobalCtx } from "../../hooks/useGlobalCtx";
import SignIn from "../access/SignIn";

export const Modal = () => {
  const { closeModal, isModalOpen } = useGlobalCtx();
  return (
    isModalOpen(EnuModalKeys.ACCESS) && (
      <>
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[35%] h-[35%] relative">
            <button
              onClick={() => closeModal(EnuModalKeys.ACCESS)}
              className="absolute top-4 right-4 text-xl font-bold text-black"
            >
              X
            </button>
            <div className="flex flex-col justify-center items-center w-full mt-10">
              <SignIn />
            </div>
          </div>
        </div>
      </>
    )
  );
};
