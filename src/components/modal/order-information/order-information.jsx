import style from "./order-information.module.css";
import stylefeed from "../../../pages/profile/profile.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderElement from "./order-element/order-element";

const OrderInformation = ({}) => {
  return (
    <div className={style.order_container}>
      <div className={style.order_number}>
        <p>#</p>
        <p className="text text_type_digits-default">1234567890</p>
      </div>
      <p className={style.title}>Black Hole Singularity острый бургер</p>
      <p className={style.status}>Выполнен</p>
      <p className={style.title}>Состав:</p>
      <div className={`${style.element_container} custom-scroll`}>
        <OrderElement />
        <OrderElement />
        <OrderElement />
        <OrderElement />
        <OrderElement />
        <OrderElement />
        <OrderElement />
      </div>
      <div className={style.bottom_container}>
        <p className={style.time_stamp}>Вчера, 13:40 i-GMT+3</p>
        <div className={style.price}>
          <p className={style.price_text}>510</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

OrderInformation.propTypes = {};

export default OrderInformation;
