import { FC } from "react";
import { useGlobalCtx } from "../../hooks/useGlobalCtx";

const Terms: FC = () => {
  const { isCheckedTerms, handleCheckboxChange } = useGlobalCtx();
  return (
    <label htmlFor="terms" className="block mt-8">
      <input
        name="terms"
        id="terms"
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={isCheckedTerms}
        title="Acepto términos legales"
      />
      Acepto términos legales
    </label>
  );
};

export default Terms;
