import React from "react";
import styles from "./main-window.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { placeOrder } from "../../actions/orderActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

function MainWindow() {
  const { ingredients, bun } = useAppSelector(state => state.burger);
  const dispatch = useAppDispatch();

  const handleOrder = () => {
    const ingredientIds = bun ? [bun._id] : [];
    ingredientIds.push(...ingredients.map((ingredient) => ingredient._id));
    if (bun) ingredientIds.push(bun._id);
    dispatch(placeOrder(ingredientIds));
  };

  return (
    <main className={styles.main_window}>
      <BurgerIngredients />
      <BurgerConstructor handleOrder={handleOrder} />
    </main>
  );
}

export default MainWindow;
