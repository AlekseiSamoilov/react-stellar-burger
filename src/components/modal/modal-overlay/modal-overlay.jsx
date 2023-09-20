import React from "react";
import styles from "./modal-overlay.module.css";
import Modal from "../modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

const ModalOverlay = ({ closeModal, content, ingredient }) => {
  return (
    <div className={styles.overlay_container} onClick={closeModal}>
      <Modal closeModal={closeModal}>
        {content === "ingredient" && <IngredientDetails />}
        {content === "order" && <OrderDetails />}
      </Modal>
    </div>
  );
};

export default ModalOverlay;
