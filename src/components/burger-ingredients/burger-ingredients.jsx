import IngredientCard from "./ingredient-card/ingredient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState("bun");

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    element.scrollIntoView();
  };

  return (
    <div>
      <h1 className={styles.ingredients__title}>Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          onClick={() => handleTabClick("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={() => handleTabClick("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={() => handleTabClick("main")}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_list} custom-scroll`}>
        <h2 className={styles.category_title}>Булки</h2>
        <div>
          <div id="bun" className={styles.ingredient_item}>
            {data
              .filter((item) => item.type === "bun")
              .map((item) => (
                <IngredientCard key={item._id} ingredient={item} />
              ))}
          </div>
          <h2 className={styles.category_title}>Соусы</h2>
          <div id="sauce" className={styles.ingredient_item}>
            {data
              .filter((item) => item.type === "sauce")
              .map((item) => (
                <IngredientCard key={item._id} ingredient={item} />
              ))}
          </div>
          <h2 className={styles.category_title}>Начинки</h2>
          <div id="main" className={styles.ingredient_item}>
            {data
              .filter((item) => item.type === "main")
              .map((item) => (
                <IngredientCard key={item._id} ingredient={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
