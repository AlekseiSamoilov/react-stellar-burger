import React from "react";
import PropTypes from "prop-types";

const IngredientCard = ({ ingredient }) => {
  return (
    <div>
      <img src={ingredient.image} alt={ingredient.name} />
      <span>{ingredient.name}</span>
      <span>{ingredient.price} ₽</span>
    </div>
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default IngredientCard;
