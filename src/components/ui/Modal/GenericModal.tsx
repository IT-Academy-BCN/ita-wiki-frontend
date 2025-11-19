/**
 * GenericModal Component
 *
 * A reusable modal component with optional primary and secondary buttons.
 *
 * BASIC USAGE:
 * ============
 *
 * Modal with one button:
 * <GenericModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Guardar cambios"
 *   showPrimaryButton
 *   primaryButtonText="Guardar"
 *   primaryButtonAction={handleSave}
 * >
 *   <p>¿Deseas guardar los cambios realizados?</p>
 * </GenericModal>
 *
 * Modal with two buttons:
 * <GenericModal
 *   isOpen={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   title="Eliminar recurso"
 *   showPrimaryButton
 *   primaryButtonText="Eliminar"
 *   primaryButtonAction={handleDelete}
 *   showSecondaryButton
 *   secondaryButtonText="Cancelar"
 *   secondaryButtonAction={() => setShowConfirm(false)}
 * >
 *   <p>Esta acción no se puede deshacer.</p>
 * </GenericModal>
 */

import { ReactNode } from "react";
import clsx from "clsx";
import closeIcon from "../../../assets/close2.svg";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  primaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showPrimaryButton = false,
  showSecondaryButton = false,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const sizeClasses = {
    sm: "w-[25%] min-w-[280px] max-w-sm",
    md: "w-[35%] min-w-[300px] max-w-md",
    lg: "w-[50%] min-w-[400px] max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          "bg-white p-6 rounded-2xl text-center relative shadow-lg",
          sizeClasses[size],
          className,
        )}
        onClick={handleContentClick}
      >
        {showCloseButton && (
          <button
            className="absolute top-6 right-6 hover:opacity-70 transition-opacity focus:outline-none focus:opacity-70 cursor-pointer"
            onClick={onClose}
            aria-label="Tancar"
          >
            <img src={closeIcon} alt="Tancar" className="w-[21px] h-[19px]" />
          </button>
        )}

        {title && (
          <h2 className="text-xl font-semibold mb-6 mt-5 mx-2 text-gray-900">
            {title}
          </h2>
        )}

        {children && (
          <div className={clsx("mb-6 text-gray-600", { "mt-5": !title })}>
            {children}
          </div>
        )}

        {(showPrimaryButton || showSecondaryButton) && (
          <div
            className={clsx(
              "flex justify-center gap-4 mb-4 mt-2",
              "max-sm:flex-col-reverse max-sm:gap-3", // Cambia orden en mobile
            )}
          >
            {showSecondaryButton && (
              <button
                onClick={secondaryButtonAction}
                className={clsx(
                  "px-6 py-3 rounded-[12px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300",
                  "bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-200 cursor-pointer",
                )}
              >
                {secondaryButtonText}
              </button>
            )}

            {showPrimaryButton && (
              <button
                onClick={primaryButtonAction}
                className={clsx(
                  "px-6 py-3 rounded-[12px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  "bg-[#c20087] text-white hover:bg-[#a1006d] focus:bg-[#a1006d] active:bg-[#85005a] focus:ring-[#c20087]/50 cursor-pointer",
                )}
              >
                {primaryButtonText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericModal;
