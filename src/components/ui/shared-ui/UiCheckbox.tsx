import { FC } from "react";

interface UiCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const CheckIcon = (
  <svg
    role="img"
    className="w-4 h-4 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const UiCheckbox: FC<UiCheckboxProps> = ({ checked, onChange, label }) => {
  const CheckboxVisual = (
    <div
      className={`w-5 h-5 flex items-center justify-center rounded border ${
        checked ? "bg-[#B91879] border-[#B91879]" : "border-gray-400"
      }`}
    >
      {checked && CheckIcon}
    </div>
  );

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      {CheckboxVisual}
      {label && (
        <span className="text-gray-800 truncate inline-block" title={label}>
          {label}
        </span>
      )}
    </label>
  );
};

export default UiCheckbox;
