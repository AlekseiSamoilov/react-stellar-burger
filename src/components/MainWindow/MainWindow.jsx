import React from "react";
import styles from "./MainWindow.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-concstructor/burger-constructor";
import { data } from "../../utils/data";

function MainWindow() {
  return (
    <div className={styles.main_window}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </div>
  );
}

export default MainWindow;
