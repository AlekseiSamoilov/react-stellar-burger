import style from "./order-information.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderElement from "./order-element/order-element";
import { FC } from "react";
import { IOrdersDetails } from "../../../services/types/data";
import { useAppSelector } from "../../../hooks/useAppSelector";

interface IOrderInformationProps {
  order: IOrdersDetails;
}

const OrderInformation: FC<IOrderInformationProps> = ({ order }) => {
  const ingredientsData = useAppSelector(state => state.load.allIngredients);
  const ingredientCounts = order.ingredients.reduce((acc: {[key: string]: number}, id: number) => {
    const ingredient = ingredientsData.find((item) => item._id === id.toString());
    if (ingredient && ingredient.type === "bun") {
      acc[id] = 2;
    } else {
      acc[id] = (acc[id] || 0) + 1;
    }
    return acc;
  }, {});

  const totalOrderPrice = order.ingredients.reduce((total, ingredientId) => {
    const ingredient = ingredientsData.find(
      (item) => item._id === ingredientId.toString()
    );
    return total + (ingredient ? ingredient.price : 0);
  }, 0);

  return (
    <div className={style.order_container}>
      <div className={style.order_number}>
        <p>#</p>
        <p className="text text_type_digits-default">{order.number}</p>
      </div>
      <p className={style.title}>{order.name}</p>
      <p className={style.status}>
        {order.status === "done" ? "Выполнен" : "В работе"}
      </p>
      <p className={style.title}>Состав:</p>
      <div className={`${style.element_container} custom-scroll`}>
        {Object.keys(ingredientCounts).map((id, index) => (
          <OrderElement
            key={index}
            ingredientId={id}
            count={ingredientCounts[id]}
          />
        ))}
      </div>
      <div className={style.bottom_container}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className={style.time_stamp}
        />
        <div className={style.price}>
          <p className={style.price_text}>{totalOrderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

OrderInformation.propTypes = {};

export default OrderInformation;
