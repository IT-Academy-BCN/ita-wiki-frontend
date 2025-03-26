import { FC, ReactNode } from "react";
import { Modal } from "../Modal/Modal";

interface AccessModalProps {
  children?: ReactNode;
}
const AccessModal: FC<AccessModalProps> = () => {
  return <Modal />;
};

export default AccessModal;
