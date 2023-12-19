import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return (
    <Link to={`/feed/${order.number}`} className={style.burger_container}>
      <div className={style.burger_item_box}>
        <div className={style.header}>
          <span className={style.order_number}>
            {formatDate(order.createdAt)}
          </span>
          <span className={style.timestamp}>Сегодня, 13:20 i-GMT+3</span>
        </div>
        <h1 className={style.title}>Заказ {order.number}</h1>
        <div className={style.status}>
          {order.status === "done" ? "Готов" : "Готовится"}
        </div>
        <div className={style.bottom}>
          <div className={style.items}>
            <div className={style.item}></div>
            <div className={style.item}></div>
            <div className={style.item}></div>
          </div>
          <div className={style.currency}>
            <span className={style.amount}>560</span>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
