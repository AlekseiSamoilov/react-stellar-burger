import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import { useNavigate } from "react-router-dom";
import { setCurrentOrder } from "../../actions/ordersActions";
import { FC } from "react";
import { IOrdersDetails } from "../../services/types/data";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

interface IOrderItemProps {
  order: IOrdersDetails
  fromProfile: boolean;
}

const OrderItem: FC<IOrderItemProps> = ({ order, fromProfile }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ingredientsData = useAppSelector(state => state.load.allIngredients);

  const ingredientsPrice = order.ingredients.map(
    (id) => ingredientsData.find((ingredient) => ingredient._id === id.toString())?.price
  );

  const totalPrice = ingredientsPrice
  .filter((price): price is number => price !== undefined)
  .reduce((acc: number, price) => acc + price, 0);

  const ingredientImages = order.ingredients.map(
    (id) => ingredientsData.find((ingredient) => ingredient._id === id.toString())?.image
  );

  const openOrderModal = () => {
    dispatch(setCurrentOrder(order));
    const path = fromProfile
      ? `/profile/orders/${order.number}`
      : `/feed/${order.number}`;
    navigate(path, { state: { modal: true, order: order } });
  };
  return (
    <div onClick={openOrderModal} className={style.burger_container}>
      <div className={style.burger_item_box}>
        <div className={style.header}>
          <span className={style.order_number}>#{order.number}</span>
          <FormattedDate
            date={new Date(order.createdAt)}
            className={style.timestamp}
          />
        </div>
        <h1 className={style.title}>{order.name}</h1>
        <div className={style.status}>
          {order.status === "done" ? "Готов" : "Готовится"}
        </div>
        <div className={style.bottom}>
          <div className={style.items}>
            {ingredientImages.map((image, index: number) => (
              <div key={index} className={style.item}>
                <img
                  className={style.item_image}
                  src={image}
                  alt={`Ингредиент ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <div className={style.currency}>
            <span className={style.amount}>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
