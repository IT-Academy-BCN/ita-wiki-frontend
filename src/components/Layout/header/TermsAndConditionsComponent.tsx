import ButtonComponent from "../../atoms/ButtonComponent";
import { TermsAndConditionsData } from "../../../moock/TermsAndConditionsData";

interface TermsAndConditionsComponentProps {
  closeModal: () => void;
}

const TermsAndConditionsComponent = ({
  closeModal,
}: TermsAndConditionsComponentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-sm max-h-[60vh] overflow-y-auto space-y-4 pe-4">
        <TermsAndConditionsData />
      </div>
      <div className="w-[25vh] self-center my-2">
        <ButtonComponent
          type="button"
          variant="primary"
          onClick={closeModal}
          title="Entès"
        >
          Entès
        </ButtonComponent>
      </div>
    </div>
  );
};

export default TermsAndConditionsComponent;
