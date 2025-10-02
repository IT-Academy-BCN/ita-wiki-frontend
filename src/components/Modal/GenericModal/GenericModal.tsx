/**
 * GenericModal Component
 * 
 * A flexible and reusable modal component with optional primary and secondary buttons.
 * All button actions must be configured from the importing component.
 * 
 * BASIC USAGE:
 * ============
 * 
 * Simple modal with default "De acuerdo" button:
 * <GenericModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Success"
 *   primaryButtonAction={() => setShowModal(false)}
 * >
 *   <p>Operation completed successfully!</p>
 * </GenericModal>
 * 
 * CUSTOM PRIMARY BUTTON:
 * =====================
 * 
 * Modal with custom primary button text and action:
 * <GenericModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Confirm Action"
 *   primaryButtonText="Confirm"
 *   primaryButtonAction={handleConfirm}
 * >
 *   <p>Are you sure you want to continue?</p>
 * </GenericModal>
 * 
 * TWO BUTTONS MODAL:
 * ==================
 * 
 * Modal with both primary and secondary buttons:
 * <GenericModal
 *   isOpen={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   title="Delete Item"
 *   primaryButtonText="Delete"
 *   primaryButtonAction={handleDelete}
 *   primaryButtonVariant="danger"
 *   secondaryButtonText="Cancel"
 *   secondaryButtonAction={() => setShowConfirm(false)}
 * >
 *   <p>This action cannot be undone.</p>
 * </GenericModal>

 * NO BUTTONS MODAL:
 * =================
 * 
 * Modal with only close button (X):
 * <GenericModal
 *   isOpen={showInfo}
 *   onClose={() => setShowInfo(false)}
 *   title="Information"
 *   showButtons={false}
 * >
 *   <p>This is just informational content.</p>
 * </GenericModal>
 * 
 * DISABLED BUTTONS:
 * =================
 * 
 * <GenericModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Processing"
 *   primaryButtonText="Save"
 *   primaryButtonAction={handleSave}
 *   primaryButtonDisabled={isLoading}
 *   secondaryButtonText="Cancel"
 *   secondaryButtonAction={handleCancel}
 *   secondaryButtonDisabled={isLoading}
 * >
 *   <p>Please wait while we process your request...</p>
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
  showButtons?: boolean;
  primaryButtonText?: string;
  primaryButtonAction?: () => void;
  primaryButtonVariant?: "primary" | "secondary" | "danger";
  primaryButtonDisabled?: boolean;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  secondaryButtonVariant?: "primary" | "secondary" | "danger";
  secondaryButtonDisabled?: boolean;
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
  showButtons = true,
  primaryButtonText = "De acuerdo",
  primaryButtonAction,
  primaryButtonVariant = "primary",
  primaryButtonDisabled = false,
  secondaryButtonText,
  secondaryButtonAction,
  secondaryButtonVariant = "secondary",
  secondaryButtonDisabled = false,
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

  const buttonVariantClasses = {
    primary:
      "bg-[#c20087] text-white hover:bg-[#a1006d] focus:bg-[#a1006d] active:bg-[#85005a] focus:ring-[#c20087]/50 cursor-pointer",
    secondary:
      "bg-gray-300 text-gray-800 hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-500 focus:ring-gray-300 cursor-pointer",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 active:bg-red-700 focus:ring-red-300 cursor-pointer",
  };

  const showSecondaryButton = !!secondaryButtonText;

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
            aria-label="Cerrar modal"
          >
            <img
              src={closeIcon}
              alt="Cerrar modal"
              className="w-[21px] h-[19px]"
            />
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

        {showButtons && (
          <div className="flex justify-center gap-4 mb-4 mt-2">
            {showSecondaryButton && (
              <button
                onClick={secondaryButtonAction}
                disabled={secondaryButtonDisabled}
                className={clsx(
                  "px-6 py-3 rounded-[12px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  buttonVariantClasses[secondaryButtonVariant],
                  {
                    "opacity-50 cursor-not-allowed": secondaryButtonDisabled,
                  },
                )}
              >
                {secondaryButtonText}
              </button>
            )}

            <button
              onClick={primaryButtonAction}
              disabled={primaryButtonDisabled}
              className={clsx(
                "px-6 py-3 rounded-[12px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                buttonVariantClasses[primaryButtonVariant],
                {
                  "opacity-50 cursor-not-allowed": primaryButtonDisabled,
                },
              )}
            >
              {primaryButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericModal;
