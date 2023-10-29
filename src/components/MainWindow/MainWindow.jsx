import React, { useEffect, useReducer } from "react";
import styles from "./MainWindow.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";
import IngredientContext from "../../services/BurgerContext";
import { burgerReducer } from "../../services/burgerReducer";
import { useModal } from "../../hooks/useModal";
import { request } from "../../utils/request";
import { RESET_CONSTRUCTOR } from "../../actions/actionTypes";

function MainWindow() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalContent, setModalContent] = useState(null);
  const [data, setData] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(burgerReducer, {
    ingredients: [],
    bun: null,
    totalPrice: 0,
  });

  useEffect(() => {
    request("/ingredients")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log("Ошибка", error);
      });
  }, []);

  const openIngredientModal = () => {
    setModalContent("ingredient");
    openModal();
  };

  const openOrderModal = () => {
    setModalContent("order");
    openModal();
  };

  // Order number
  const placeOrder = (ingredients) => {
    return request("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOrder = async () => {
    const ingredientIds = data.map((ingredient) => ingredient._id);
    setIsLoading(true);
    const orderResult = await placeOrder(ingredientIds);

    if (orderResult && orderResult.success) {
      openOrderModal();
      setOrderNumber(orderResult.order.number);
      dispatch({ type: "RESET_CONSTRUCTOR" });
    }
    setIsLoading(false);
  };

  return (
    <IngredientContext.Provider value={{ data, state, dispatch }}>
      <main className={styles.main_window}>
        <BurgerIngredients
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
        <BurgerConstructor handleOrder={handleOrder} isLoading={isLoading} />
      </main>
    </IngredientContext.Provider>
  );
}

export default MainWindow;
