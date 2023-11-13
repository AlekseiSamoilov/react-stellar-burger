import React, { useContext, useState, useRef } from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientContext from "../../services/BurgerContext";
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  addBun,
  addIngredient,
  removeIngredient,
  sortIngredient,
} from "../../actions/constructorActions";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";

const BurgerConstructor = ({ handleOrder, isLoading }) => {
  const dispatch = useDispatch();
  const burgerSelector = (state) => state.burger;
  const { ingredients, bun, totalPrice } = useSelector(burgerSelector);
  const ingredientsArray = Object.values(ingredients);

  const handleAddIngredient = (item) => {
    const uniqueId = `${item._id}_${new Date().getTime()}`;
    dispatch(addIngredient({ ...item, uniqueId }));
  };
  const [, dropRef] = useDrop({
    accept: ["ingredient", "sort-ingredient"],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (item.type === "bun") {
        dispatch(addBun(item));
      } else if (item.type === "main") {
        handleAddIngredient(item);
      } else if (item.type === "sauce") {
        handleAddIngredient(item);
      } else {
        return;
      }
    },
  });

  const moveIngredient = (dragIndex, hoverIndex) => {
    if (dragIndex !== hoverIndex) {
      dispatch(sortIngredient({ dragIndex, hoverIndex }));
    }
  };

  function handleRemoveIngredient(ingredientId) {
    dispatch(removeIngredient(ingredientId));
  }

  return (
    <div ref={dropRef} className={styles.constructor_container}>
      <div className={styles.ingredient_box}>
        <div className={styles.locked_ingredient}>
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              key={`bun-top-${bun._id}`}
            />
          )}
        </div>
        <ul className={`${styles.constructor_list} custom-scroll`}>
          {ingredientsArray &&
            ingredientsArray.map((ingredient, index) => (
              <DraggableIngredient
                key={ingredient.uniqueId}
                ingredient={ingredient}
                index={index}
                moveIngredient={moveIngredient}
                handleRemoveIngredient={handleRemoveIngredient}
              />
            ))}
        </ul>
        {/* <ul className={`${styles.constructor_list} custom-scroll`}>
          {ingredientsArray &&
            ingredientsArray.map((ingredient, index) => (
              <li
                key={ingredient.uniqueId + index}
                className={styles.li_element}
              >
                <DragIcon type="primary" className={styles.drag_icon} />
                {ingredient && (
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() =>
                      handleRemoveIngredient(ingredient.uniqueId)
                    }
                  />
                )}
              </li>
            ))}
        </ul> */}
        <div className={styles.locked_ingredient}>
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              key={`bun-bottom-${bun._id}`}
            />
          )}
        </div>
      </div>
      <div className={styles.buy_container}>
        <div className={styles.sum_container}>
          <p className={styles.total_sum}>
            {isNaN(totalPrice) ? "0" : totalPrice}
          </p>

          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrder}
          disabled={!bun || isLoading}
        >
          {isLoading ? "Загрузка..." : "Оформить заказ"}
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  handleOrder: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default BurgerConstructor;
