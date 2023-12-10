import React, { useEffect, useReducer } from "react";
import styles from "./main-window.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";
import { useModal } from "../../hooks/useModal";
import { request } from "../../utils/request";
import { resetConstructor } from "../../actions/constructorActions";
import {
  placeOrderFail,
  placeOrderStart,
  placeOrderSuccess,
} from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function MainWindow() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalContent, setModalContent] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { ingredients, bun } = useSelector((state) => state.burger);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  const openIngredientModal = () => {
    setModalContent(true);
    openModal();
  };
  useEffect(() => {
    if (background) {
      openIngredientModal();
    }
  }, [background, openIngredientModal]);

  const openOrderModal = () => {
    setModalContent("order");
    openModal();
  };

  // Order number
  const placeOrder = async (ingredients) => {
    setIsLoading(true);
    dispatch(placeOrderStart());
    try {
      const result_1 = await request("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });
      dispatch(placeOrderSuccess());
      setOrderNumber(result_1.order.number);
      openOrderModal();
      dispatch(resetConstructor());
    } catch (error) {
      console.log(error);
      dispatch(placeOrderFail());
    } finally {
      setIsLoading(false);
    }
  };
  const handleOrder = async () => {
    const ingredientIds = bun ? [bun._id] : [];
    ingredientIds.push(...ingredients.map((ingredient) => ingredient._id));
    if (bun) ingredientIds.push(bun._id);
    await placeOrder(ingredientIds);
  };

  return (
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
  );
}

export default MainWindow;
