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
import {
  placeOrderStart,
  placeOrderSuccess,
  placeOrderFail,
  resetConstructor,
} from "../../actions/actions";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setIngredients } from "../../actions/actions";

function MainWindow() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalContent, setModalContent] = useState(null);
  const [data, setData] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { allIngredients, ingredients, bun, totalPrice } = useSelector(
    (state) => state.burger
  );
  const dispatch = useDispatch();

  useEffect(() => {
    request("/ingredients")
      .then((result) => {
        dispatch(setIngredients(result.data));
      })
      .catch((error) => {
        console.log("Ошибка", error);
      });
  }, [dispatch]);

  const openIngredientModal = () => {
    setModalContent("ingredient");
    openModal();
  };

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
    const ingredientIds = allIngredients.map((ingredient) => ingredient._id);
    await placeOrder(ingredientIds);
    // setIsLoading(false);
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
