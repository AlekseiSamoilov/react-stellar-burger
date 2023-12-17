import IngredientCard from "./ingredient-card/ingredient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useMemo, useRef, useState, useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";

const BurgerIngredients = ({ openIngredientModal, setSelectedIngredient }) => {
  const [currentTab, setCurrentTab] = useState("bun");
  const dispatch = useDispatch();
  const { allIngredients } = useSelector((state) => state.load);
  const containerRef = useRef(null);
  const { ingredients } = useSelector((state) => state.burger);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) {
      console.warn("Container not found!");
      return;
    }

    const bunsElement = document.getElementById("bun");
    const saucesElement = document.getElementById("sauce");
    const mainsElement = document.getElementById("main");

    const bunsPosition =
      bunsElement.getBoundingClientRect().top -
      container.getBoundingClientRect().top;
    const saucesPosition =
      saucesElement.getBoundingClientRect().top -
      container.getBoundingClientRect().top;
    const mainsPosition =
      mainsElement.getBoundingClientRect().top -
      container.getBoundingClientRect().top;

    const positions = [
      { type: "bun", position: Math.abs(bunsPosition) },
      { type: "sauce", position: Math.abs(saucesPosition) },
      { type: "main", position: Math.abs(mainsPosition) },
    ];

    const closest = positions.sort((a, b) => a.position - b.position)[0].type;

    setCurrentTab(closest);
  };
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [allIngredients]);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    element.scrollIntoView({ behavior: "smooth" });
  };
  const buns = useMemo(
    () => allIngredients.filter((item) => item.type === "bun"),
    [allIngredients]
  );
  const sauces = useMemo(
    () => allIngredients.filter((item) => item.type === "sauce"),
    [allIngredients]
  );
  const mains = useMemo(
    () => allIngredients.filter((item) => item.type === "main"),
    [allIngredients]
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
      <div
        className={`${styles.ingredients_list} custom-scroll`}
        id="ingredients-container"
        ref={containerRef}
      >
        <h2 className={styles.category_title}>Булки</h2>
        <div>
          <div id="bun" className={styles.ingredient_item}>
            {buns.map((item, index) => (
              <IngredientCard
                openIngredientModal={openIngredientModal}
                key={index}
                ingredient={item}
                setSelectedIngredient={setSelectedIngredient}
                // handleIngredientClick={handleIngredientClick}
                count={ingredients[item._id]?.count || 0}
                index={index}
              />
            ))}
          </div>
          <h2 className={styles.category_title}>Соусы</h2>
          <div id="sauce" className={styles.ingredient_item}>
            {sauces.map((item, index) => (
              <IngredientCard
                key={index}
                ingredient={item}
                openIngredientModal={openIngredientModal}
                setSelectedIngredient={setSelectedIngredient}
                // handleIngredientClick={handleIngredientClick}
                count={ingredients[item._id]?.count || 0}
                index={index}
              />
            ))}
          </div>
          <h2 className={styles.category_title}>Начинки</h2>
          <div id="main" className={styles.ingredient_item}>
            {mains.map((item, index) => (
              <IngredientCard
                key={index}
                ingredient={item}
                openIngredientModal={openIngredientModal}
                setSelectedIngredient={setSelectedIngredient}
                // handleIngredientClick={handleIngredientClick}
                index={index}
                count={ingredients[item._id]?.count || 0}
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
};

export default BurgerIngredients;
