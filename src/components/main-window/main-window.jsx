import React, { useEffect, useReducer } from "react";
import styles from "./main-window.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { openModal, closeModal, placeOrder } from "../../actions/orderActions";

function MainWindow() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const { ingredients, bun } = useSelector((state) => state.burger);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  const openIngredientModal = () => {
    dispatch(openModal("ingredient"));
  };

  useEffect(() => {
    if (background) {
      openIngredientModal();
    }
  }, [background, openIngredientModal]);

  const handleOrder = async () => {
    const ingredientIds = bun ? [bun._id] : [];
    ingredientIds.push(...ingredients.map((ingredient) => ingredient._id));
    if (bun) ingredientIds.push(bun._id);
    dispatch(placeOrder(ingredientIds));
  };

  return (
    <main className={styles.main_window}>
      <BurgerIngredients
        openIngredientModal={openIngredientModal}
        setSelectedIngredient={setSelectedIngredient}
      />
      <BurgerConstructor handleOrder={handleOrder} />
    </main>
  );
}

export default MainWindow;
