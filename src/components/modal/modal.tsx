import React, { FC, MouseEvent, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";

interface IModalProps {
  closeModal: () => void;
  children: ReactNode
}

const Modal: FC<IModalProps> = ({ closeModal, children }) => {
  const closeByOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", closeByEsc);
    return () => {
      window.removeEventListener("keydown", closeByEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={closeByOverlayClick} />
      <div className={styles.modal_container}>
        <div className={styles.close_btn} onClick={closeModal}>
          <CloseIcon type="primary" />{" "}
        </div>
        {children}
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
