import React, { useEffect, useReducer } from "react";
import styles from "./MainWindow.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";
import { API_URL } from "../../utils/constants";
import IngredientContext from "../../services/BurgerContext";
import { burgerReducer } from "../../services/burgerReducer";
import { API_ORDER } from "../../utils/constants";

function MainWindow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [data, setData] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [state, dispatch] = useReducer(burgerReducer, {
    ingredients: [],
    bun: null,
    totalPrice: 0,
  });

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

  // Order number
  const placeOrder = async (ingredients) => {
    try {
      const response = await fetch(API_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });
      if (!response.ok) {
        throw new Error("Order not placed");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async () => {
    const ingredientIds = data.map((ingredient) => ingredient._id);
    const orderResult = await placeOrder(ingredientIds);

    if (orderResult && orderResult.success) {
      openOrderModal();
      setOrderNumber(orderResult.order.number);
    }
  };

  return (
    <IngredientContext.Provider value={{ data, state, dispatch }}>
      <div className={styles.main_window}>
        <BurgerIngredients
          data={data}
          dispatch={dispatch}
          openIngredientModal={openIngredientModal}
          setSelectedIngredient={setSelectedIngredient}
        />
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            {modalContent === "ingredient" && (
              <IngredientDetails ingredient={selectedIngredient} />
            )}
            {modalContent === "order" && (
              <OrderDetails orderNumber={orderNumber} />
            )}
          </Modal>
        )}
        <BurgerConstructor
          openOrderModal={openOrderModal}
          dispatch={dispatch}
          setOrderNumber={setOrderNumber}
          handleOrder={handleOrder}
        />
      </div>
    </IngredientContext.Provider>
  );
}

export default MainWindow;
