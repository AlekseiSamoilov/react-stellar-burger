import React, { FC } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addBun,
  addIngredient,
  removeIngredient,
  sortIngredient,
} from "../../actions/constructorActions";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import { useNavigate } from "react-router-dom";
import { TIngredient } from "../../services/types";
import { Dispatch } from "redux";
import { IRootState } from "../../services/rootReducer";
import { TConstructorActions } from "../../services/constructorReducer";
import { TDispatch } from "../../services/store";

type TBurgerConstructorDispatch = Dispatch<TConstructorActions>

interface IBurgerConstructorProps {
  handleOrder: () => void;
}

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ handleOrder }) => {

  const dispatch: TDispatch = useDispatch<TBurgerConstructorDispatch>();
  const navigate = useNavigate(); 
  const burgerSelector = (state: IRootState) => state.burger; 
  const { isLoggedIn } = useSelector((state: IRootState) => state.auth); 
  const { isLoading } = useSelector((state: IRootState) => state.order); 
  const { ingredients, bun, totalPrice } = useSelector(burgerSelector); 
  const ingredientsArray: Array<TIngredient> = Object.values(ingredients); 

  const hadnleButtonClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      handleOrder();
    }
  };

  const handleAddIngredient = (item: TIngredient) => {
    const uniqueId = `${item._id}_${new Date().getTime()}`;
    dispatch(addIngredient({ ...item, uniqueId }));
  };
  const [, dropRef] = useDrop({
    accept: ["ingredient", "sort-ingredient"],
    drop: (item: TIngredient, monitor) => {
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

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    if (dragIndex !== hoverIndex) {
      dispatch(sortIngredient({ dragIndex, hoverIndex }));
    }
  };

  function handleRemoveIngredient(ingredientId: string) {
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

export default BurgerConstructor;