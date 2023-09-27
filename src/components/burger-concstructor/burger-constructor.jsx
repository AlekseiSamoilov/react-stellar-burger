import React from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Icons,
  Button,
  Typography,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ data, openOrderModal }) => {
  const buns = data.filter((item) => item.type === "bun");
  const firstBun = buns[0];
  const fillings = data.filter((item) => item.type !== "bun");
  return (
    <div className={styles.constructor_container}>
      <div className={styles.ingredient_box}>
        <div className={styles.locked_ingredient}>
          {firstBun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={firstBun.name}
              price={firstBun.price}
              thumbnail={firstBun.image}
            />
          )}
        </div>
        <ul className={`${styles.constructor_list} custom-scroll`}>
          {fillings.map((ingredient) => (
            <li key={ingredient._id} className={styles.li_element}>
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
          {firstBun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={firstBun.name}
              price={firstBun.price}
              thumbnail={firstBun.image}
            />
          )}
        </div>
      </div>
      <div className={styles.buy_container}>
        <div className={styles.sum_container}>
          <p className={styles.total_sum}>600</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openOrderModal}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  openOrderModal: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      price: PropTypes.number,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      image: PropTypes.string,
    })
  ),
};

export default BurgerConstructor;
