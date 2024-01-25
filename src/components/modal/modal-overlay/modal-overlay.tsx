import React, { FC, MouseEvent } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
  return <div className={styles.overlay_container} onClick={onClick}></div>;
};

export default ModalOverlay;
