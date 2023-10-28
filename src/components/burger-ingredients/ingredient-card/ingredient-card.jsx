import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Icons,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({
  ingredient,
  openIngredientModal,
  setSelectedIngredient,
}) => {
  const handleClick = () => {
    setSelectedIngredient(ingredient);
    openIngredientModal();
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <img src={ingredient.image} alt={ingredient.name} />
      <Counter count={1} size="default" extraClass="m-1" />
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
