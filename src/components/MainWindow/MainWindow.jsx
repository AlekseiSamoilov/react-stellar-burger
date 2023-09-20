import React from "react";
import styles from "./MainWindow.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { data } from "../../utils/data";
import { useState } from "react";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";

function MainWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openIngredientModal = () => {
    setModalContent("ingredient");
    setIsModalOpen(true);
  };

  const openOrderModal = () => {
    setModalContent("order");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.main_window}>
      <BurgerIngredients
        data={data}
        openIngredientModal={openIngredientModal}
      />
      {isModalOpen && (
        <ModalOverlay closeModal={closeModal} content={modalContent} />
      )}
      <BurgerConstructor data={data} openOrderModal={openOrderModal} />
    </div>
  );
}

export default MainWindow;
