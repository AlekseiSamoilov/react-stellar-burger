import React, { useEffect } from "react";
import styles from "./MainWindow.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { useState } from "react";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";

function MainWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [data, setData] = useState([]);
  const API_URL = "https://norma.nomoreparties.space/api/ingredients";
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Где-то ошибка");
        }
        return response.json();
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log("Ошибка", error);
      });
  }, []);

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
        setSelectedIngredient={setSelectedIngredient}
      />
      {isModalOpen && (
        <ModalOverlay
          closeModal={closeModal}
          content={modalContent}
          selectedIngredient={selectedIngredient}
        />
      )}
      <BurgerConstructor data={data} openOrderModal={openOrderModal} />
    </div>
  );
}

export default MainWindow;
