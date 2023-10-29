import IngredientCard from "./ingredient-card/ingredient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useMemo, useState } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import IngredientContext from "../../services/BurgerContext";

const BurgerIngredients = ({
  data,
  openIngredientModal,
  setSelectedIngredient,
}) => {
  const [currentTab, setCurrentTab] = useState("bun");
  const { dispatch } = useContext(IngredientContext);

  const handleIngredientClick = (ingredients) => {
    if (ingredients.type === "bun") {
      dispatch({ type: "ADD_BUN", bun: ingredients });
    } else {
      dispatch({ type: "ADD_INGREDIENT", ingredient: ingredients });
    }
  };

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    element.scrollIntoView({ behavior: "smooth" });
  };
  const buns = useMemo(
    () => data.filter((item) => item.type === "bun"),
    [data]
  );
  const sauces = useMemo(
    () => data.filter((item) => item.type === "sauce"),
    [data]
  );
  const mains = useMemo(
    () => data.filter((item) => item.type === "main"),
    [data]
  );

  return (
    <div>
      <h1 className={styles.ingredients__title}>Соберите бургер</h1>
      <div className={styles.tab_box}>
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
            {buns.map((item) => (
              <IngredientCard
                openIngredientModal={openIngredientModal}
                key={item._id}
                ingredient={item}
                setSelectedIngredient={setSelectedIngredient}
                handleIngredientClick={handleIngredientClick}
              />
            ))}
          </div>
          <h2 className={styles.category_title}>Соусы</h2>
          <div id="sauce" className={styles.ingredient_item}>
            {sauces.map((item) => (
              <IngredientCard
                key={item._id}
                ingredient={item}
                openIngredientModal={openIngredientModal}
                setSelectedIngredient={setSelectedIngredient}
                handleIngredientClick={handleIngredientClick}
              />
            ))}
          </div>
          <h2 className={styles.category_title}>Начинки</h2>
          <div id="main" className={styles.ingredient_item}>
            {mains.map((item) => (
              <IngredientCard
                key={item._id}
                ingredient={item}
                openIngredientModal={openIngredientModal}
                setSelectedIngredient={setSelectedIngredient}
                handleIngredientClick={handleIngredientClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  openIngredientModal: PropTypes.func.isRequired,
  setSelectedIngredient: PropTypes.func.isRequired,
  data: ingredientPropType.isRequired,
};

export default BurgerIngredients;
