import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const keyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [closeModal]);

  const modal = (
    <>
      <div className={styles.modal_container}>
        <div className={styles.close_btn} onClick={closeModal}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  // children: PropTypes.node.isRequired,
};

export default Modal;
