import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

const IngredientCard = ({
  ingredient,
  openIngredientModal,
  setSelectedIngredient,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient, type: ingredient.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;

  // const ingredientCount = useSelector(
  //   (state) =>
  //     state.burger.ingredients.filter((i) => i._id === ingredient._id).length,
  //   console.log("count called")
  // );
  const ingredientCount = useSelector((state) => {
    const countIngredients = state.burger.ingredients.filter(
      (i) => i._id === ingredient._id
    ).length;
    const countBuns = ingredient._id === state.burger.bun?._id ? 2 : 0;
    return countIngredients + countBuns;
  });

  const handleClick = () => {
    setSelectedIngredient(ingredient);
    openIngredientModal();
  };

  return (
    <div
      ref={dragRef}
      className={styles.container}
      style={{ opacity }}
      onClick={() => {
        // handleIngredientClick(ingredient);
        handleClick();
      }}
    >
      <img src={ingredient.image} alt={ingredient.name} />
      <Counter count={ingredientCount} size="default" extraClass="m-1" />
      <div className={styles.price_box}>
        <span className={styles.text_price}>{ingredient.price} </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={styles.text_name}>{ingredient.name}</span>
    </div>
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.object.isRequired,
  openIngredientModal: PropTypes.func.isRequired,
  setSelectedIngredient: PropTypes.func.isRequired,
};

export default IngredientCard;
