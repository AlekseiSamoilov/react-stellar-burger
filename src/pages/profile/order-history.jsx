import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import OrderItem from "./order-item";

const OrderHistory = () => {
  return (
    <div className={style.order_container}>
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </div>
  );
};

export default OrderHistory;
