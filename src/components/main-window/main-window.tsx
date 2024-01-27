import React, { useEffect } from "react";
import styles from "./main-window.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { Location, useLocation } from "react-router-dom";
import { placeOrder } from "../../actions/orderActions";
import { IRootState, TRootState } from "../../services/rootReducer";
import { AnyAction, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { TDispatch } from "../../services/store";

function MainWindow() {
  const { ingredients, bun } = useSelector((state: IRootState) => state.burger);
  const dispatch: TDispatch = useDispatch();
  // const location: Location = useLocation();
  // const background = location.state && location.state.background;

  // const openIngredientModal = () => {
  //   dispatch(openModal("ingredient"));
  // };

  // useEffect(() => {
  //   if (background) {
  //     openIngredientModal();
  //   }
  // }, [background, openIngredientModal]);

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
