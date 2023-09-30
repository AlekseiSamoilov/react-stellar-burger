import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";

const Modal = ({ closeModal, children }) => {
  const closeByOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const closeByEsc = (e) => {
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
    document.getElementById("modal-root")
  );
};
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
