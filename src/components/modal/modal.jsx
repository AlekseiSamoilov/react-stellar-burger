import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ closeModal, children }) => {
  return (
    <>
      <div className={styles.modal_container}>
        <div className={styles.close_btn} onClick={closeModal}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
