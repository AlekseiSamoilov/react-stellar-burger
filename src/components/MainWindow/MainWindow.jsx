import React, { useEffect } from "react";
import styles from "./MainWindow.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";
import { API_URL } from "../../utils/constants";
import IngredientContext from "../../services/BurgerContext";

function MainWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [data, setData] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [constructorIngredient, setConstructorIngredient] = useState([]);
  const [bun, setBun] = useState(null);

  const addIngredient = (ingredient) => {
    setConstructorIngredient((prevIngredients) => [
      ...prevIngredients,
      ingredient,
    ]);
  };

  const addBun = (newBun) => {
    setBun(newBun);
  };

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
    <IngredientContext.Provider value={data}>
      <div className={styles.main_window}>
        <BurgerIngredients
          data={data}
          addIngredient={addIngredient}
          openIngredientModal={openIngredientModal}
          setSelectedIngredient={setSelectedIngredient}
          addBun={addBun}
        />
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            {modalContent === "ingredient" && (
              <IngredientDetails ingredient={selectedIngredient} />
            )}
            {modalContent === "order" && <OrderDetails />}
          </Modal>
        )}
        <BurgerConstructor
          // data={constructorIngredient}
          openOrderModal={openOrderModal}
          constructorIngredients={constructorIngredient}
          bun={bun}
        />
      </div>
    </IngredientContext.Provider>
  );
}

export default MainWindow;
