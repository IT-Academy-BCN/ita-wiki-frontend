import { FC } from "react";
import { Modal } from "../Modal/Modal";

interface AccessModalProps {
  children?: React.ReactNode
}
const AccessModal: FC<AccessModalProps> = () => {
  return (<Modal />);
}

export default AccessModal;