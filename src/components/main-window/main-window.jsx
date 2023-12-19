import React, { useEffect, useReducer } from "react";
import styles from "./main-window.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";
import { useModal } from "../../hooks/useModal";
import { request, fetchWithRefresh } from "../../utils/request";
import { resetConstructor } from "../../actions/constructorActions";
import {
  placeOrderFail,
  placeOrderStart,
  placeOrderSuccess,
} from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import OrderInformation from "../modal/order-information/order-information";
import { openModal, closeModal, placeOrder } from "../../actions/orderActions";

function MainWindow() {
  // const { isModalOpen, openModal, closeModal } = useModal();
  const [modalContent, setModalContent] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const orderNumber = useSelector((state) => state.order.orderNumber);
  // const [orderNumber, setOrderNumber] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const { ingredients, bun } = useSelector((state) => state.burger);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const showModal = useSelector((state) => state.order.showModal);

  const handleOpenModal = () => {
    dispatch(openModal());
  };
  const openIngredientModal = () => {
    setModalContent(true);
    handleOpenModal();
  };

  useEffect(() => {
    if (background) {
      openIngredientModal();
    }
  }, [background, openIngredientModal]);

  useEffect(() => {
    if (orderNumber) {
      openOrderModal();
    }
  }, [orderNumber]);

  const openOrderModal = () => {
    setModalContent("order");
    handleOpenModal();
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleOrder = async () => {
    const ingredientIds = bun ? [bun._id] : [];
    ingredientIds.push(...ingredients.map((ingredient) => ingredient._id));
    if (bun) ingredientIds.push(bun._id);
    dispatch(placeOrder(ingredientIds));
  };
  console.log({ showModal, modalContent, orderNumber });
  return (
    <main className={styles.main_window}>
      <BurgerIngredients
        openIngredientModal={openIngredientModal}
        setSelectedIngredient={setSelectedIngredient}
      />
      {showModal && (
        <Modal closeModal={handleCloseModal}>
          {modalContent === "ingredient" && (
            <IngredientDetails ingredient={selectedIngredient} />
          )}
          {modalContent === "order" && (
            <OrderDetails orderNumber={orderNumber} />
          )}
          {/* {modalContent === "order-information" && (
            <OrderInformation orderNumber={orderNumber} />
          )} */}
        </Modal>
      )}
      <BurgerConstructor handleOrder={handleOrder} />
    </main>
  );
}

export default MainWindow;
