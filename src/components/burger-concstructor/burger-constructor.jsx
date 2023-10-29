import React, { useContext, useState } from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientContext from "../../services/BurgerContext";

const BurgerConstructor = ({ handleOrder, isLoading }) => {
  const { state } = useContext(IngredientContext);
  const { ingredients, bun, totalPrice } = state;

  return (
    <div className={styles.constructor_container}>
      <div className={styles.ingredient_box}>
        <div className={styles.locked_ingredient}>
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
        <ul className={`${styles.constructor_list} custom-scroll`}>
          {ingredients &&
            ingredients.map((ingredient, index) => (
              <li key={ingredient._id + index} className={styles.li_element}>
                <DragIcon type="primary" className={styles.drag_icon} />
                {ingredient && (
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                )}
              </li>
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
            />
          )}
        </div>
      </div>
      <div className={styles.buy_container}>
        <div className={styles.sum_container}>
          <p className={styles.total_sum}>{totalPrice}</p>
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
