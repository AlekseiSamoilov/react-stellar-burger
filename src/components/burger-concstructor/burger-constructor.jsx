import React, { useContext, useState, useRef } from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  addBun,
  addIngredient,
  removeIngredient,
  sortIngredient,
} from "../../actions/constructorActions";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = ({ handleOrder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const burgerSelector = (state) => state.burger;
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.order);
  const { ingredients, bun, totalPrice } = useSelector(burgerSelector);
  const ingredientsArray = Object.values(ingredients);

  const hadnleButtonClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      handleOrder();
    }
  };

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
          onClick={hadnleButtonClick}
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
  // isLoading: PropTypes.bool.isRequired,
};

export default BurgerConstructor;
