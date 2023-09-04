// BurgerIngredients.js

import IngredientCard from "./ingredient-card/ingredient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState("bun");

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const bunElement = document.getElementById("bun").offsetTop;
      const sauceElement = document.getElementById("sauce").offsetTop;
      const mainElement = document.getElementById("main").offsetTop;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= mainElement - 50) {
        setCurrentTab("main");
      } else if (scrollPosition >= sauceElement - 50) {
        setCurrentTab("sauce");
      } else if (scrollPosition >= bunElement - 50) {
        setCurrentTab("bun");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          onClick={() => handleTabClick("bun")}
        >
          Bun
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={() => handleTabClick("sauce")}
        >
          Sauce
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={() => handleTabClick("main")}
        >
          Main
        </Tab>
      </div>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <div className="ingredient_list">
          <div id="bun">
            <h2>Bun</h2>
            {data
              .filter((item) => item.type === "bun")
              .map((item) => (
                <IngredientCard key={item._id} ingredient={item} />
              ))}
          </div>
          <div id="sauce">
            <h2>Sauce</h2>
            {data
              .filter((item) => item.type === "sauce")
              .map((item) => (
                <IngredientCard key={item._id} ingredient={item} />
              ))}
          </div>
          <div id="main">
            <h2>Main</h2>
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
