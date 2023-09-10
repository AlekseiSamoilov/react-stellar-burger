import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Icons,
  Button,
  Typography,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ data }) => {
  const buns = data.filter((item) => item.type === "bun");
  const firstBun = buns[0];
  const fillings = data.filter((item) => item.type !== "bun");
  return (
    <div className={styles.constructor_container}>
      <div className={styles.ingredient_box}>
        <div className={styles.locked_ingredient}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={firstBun.name}
            price={firstBun.price}
            thumbnail={firstBun.image}
          />
        </div>
        <ul className={styles.constructor_list}>
          {fillings.map((ingredient) => (
            <li key={ingredient._id} className={styles.li_element}>
              <DragIcon type="primary" className={styles.drag_icon} />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>
        <div className={styles.locked_ingredient}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={firstBun.name}
            price={firstBun.price}
            thumbnail={firstBun.image}
          />
        </div>
      </div>
      <div className={styles.buy_container}>
        <div className={styles.sum_container}>
          <p className={styles.total_sum}>600</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Нажми на меня
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
