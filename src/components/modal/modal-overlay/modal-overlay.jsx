import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";
import Modal from "../modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

// const ModalOverlay = ({ closeModal, content, selectedIngredient }) => {
//   return (
//     <div className={styles.overlay_container} onClick={closeModal}>
//       <Modal closeModal={closeModal}>
//         {content === "ingredient" && (
//           <IngredientDetails ingredient={selectedIngredient} />
//         )}
//         {content === "order" && <OrderDetails />}
//       </Modal>
//     </div>
//   );
// };
const ModalOverlay = ({ closeModal, children }) => {
  const overlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className={styles.overlay_container} onClick={overlayClick}>
      <Modal closeModal={closeModal}>{children}</Modal>
    </div>
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  content: PropTypes.oneOf(["ingredient", "order"]).isRequired,
  selectedIngredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default ModalOverlay;
