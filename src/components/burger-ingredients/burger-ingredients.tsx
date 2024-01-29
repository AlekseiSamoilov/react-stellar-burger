import IngredientCard from "./ingredient-card/ingredient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo, useRef, useState, useEffect, FC } from "react";
import styles from "./burger-ingredients.module.css";
import { TIngredient } from "../../services/types";
import { useAppSelector } from "../../hooks/useAppSelector";


const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("bun");
  const { allIngredients } = useAppSelector(state => state.load);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ingredients } = useAppSelector(state => state.burger);

  const handleScroll = () => {
    const container = containerRef.current as HTMLElement | null;
    if (!container) {
      console.warn("Container not found!");
      return;
    }

    const bunsElement = document.getElementById("bun") as HTMLElement;
    const saucesElement = document.getElementById("sauce") as HTMLElement;
    const mainsElement = document.getElementById("main") as HTMLElement;

    if (!bunsElement || !saucesElement || !mainsElement) {
      console.log("Elements not found");
      return;
    }

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
      container.addEventListener("scroll", handleScroll) ;
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [allIngredients]);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element)
    {
      element.scrollIntoView({ behavior: "smooth" });
  }
  };
  const buns = useMemo(
    () => allIngredients.filter((item: TIngredient) => item.type === "bun"),
    [allIngredients]
  );
  const sauces = useMemo(
    () => allIngredients.filter((item: TIngredient) => item.type === "sauce"),
    [allIngredients]
  );
  const mains = useMemo(
    () => allIngredients.filter((item: TIngredient) => item.type === "main"),
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
            {buns.map((item: TIngredient, index: number) => {
              const ingredientInConstructor = ingredients.find(i => i._id === item._id);
              const count = ingredientInConstructor ? ingredientInConstructor.count : 0;
              return (
              <IngredientCard
                key={item._id}
                ingredient={item}
                count={count}
                index={index}
              />
              )
})}
          </div>
          <h2 className={styles.category_title}>Соусы</h2>
          <div id="sauce" className={styles.ingredient_item}>
            {sauces.map((item: TIngredient, index: number) => {
                const ingredientInConstructor = ingredients.find(i => i._id === item._id);
                const count = ingredientInConstructor ? ingredientInConstructor.count : 0;
                return (
              <IngredientCard
                key={index}
                ingredient={item}
                count={count}
                index={index}
              />)
            })}
          </div>
          <h2 className={styles.category_title}>Начинки</h2>
          <div id="main" className={styles.ingredient_item}>
            {mains.map((item: TIngredient, index: number) => {
               const ingredientInConstructor = ingredients.find(i => i._id === item._id);
               const count = ingredientInConstructor ? ingredientInConstructor.count : 0;
              return (
              <IngredientCard
                key={index}
                ingredient={item}
                index={index}
                count={count}
              />)
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
