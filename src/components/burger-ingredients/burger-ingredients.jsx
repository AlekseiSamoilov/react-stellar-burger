import IngredientCard from "./ingredient-card/ingredient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";

const BurgerIngredients = ({
  data,
  openIngredientModal,
  setSelectedIngredient,
}) => {
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
                <IngredientCard
                  openIngredientModal={openIngredientModal}
                  key={item._id}
                  ingredient={item}
                  setSelectedIngredient={setSelectedIngredient}
                />
              ))}
          </div>
          <h2 className={styles.category_title}>Соусы</h2>
          <div id="sauce" className={styles.ingredient_item}>
            {data
              .filter((item) => item.type === "sauce")
              .map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  openIngredientModal={openIngredientModal}
                  setSelectedIngredient={setSelectedIngredient}
                />
              ))}
          </div>
          <h2 className={styles.category_title}>Начинки</h2>
          <div id="main" className={styles.ingredient_item}>
            {data
              .filter((item) => item.type === "main")
              .map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  openIngredientModal={openIngredientModal}
                  setSelectedIngredient={setSelectedIngredient}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
  openIngredientModal: PropTypes.func.isRequired,
  setSelectedIngredient: PropTypes.func.isRequired,
};

export default BurgerIngredients;
