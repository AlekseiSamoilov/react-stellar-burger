import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
  Counter,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState("bun");

  return (
    <section className={styles.burger_ingredietns}>
      <div style={{ display: "flex" }}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          onClick={() => setCurrentTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={() => setCurrentTab("main")}
        >
          Начинки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={() => setCurrentTab("sauce")}
        >
          Соусы
        </Tab>
      </div>

      <div className={styles.ingredients_list}>
        {ingredients
          .filter((ingredients) => ingredients.type === "sauce")
          .map((item) => (
            <article key={item._id} className="ingredient_item">
              <img src={item.image} alt={item.name} />
              <span className="ingredient-name">{item.name}</span>
              <span className="ingredient-price">{item.price} ₽</span>
              <Counter count={1} size="default" extraClass="m-1" />
            </article>
          ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
