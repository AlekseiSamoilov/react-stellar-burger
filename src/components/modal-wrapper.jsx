import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./modal/modal";
import IngredientDetails from "./modal/ingredient-details/ingredient-details";

function ModalWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const isModal = location.state?.modal;
  const modalIngredient = isModal ? location.state.ingredient : null;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <>
      {isModal && (
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={modalIngredient} />
        </Modal>
      )}
    </>
  );
}

export default ModalWrapper;
