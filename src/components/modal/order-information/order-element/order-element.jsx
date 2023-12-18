import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-element.module.css";

const OrderElement = ({}) => {
  return (
    <div className={style.element_container}>
      <div className={style.item_container}>
        <div className={style.item}></div>
        <p className={style.item_name}>
          Филе Люминесцентного тетраодонтимформа
        </p>
      </div>
      <div className={style.price_container}>
        <p className={style.price_count}>1</p>
        <p className={style.price_count}>x</p>
        <p className={style.price_count}>30</p>
        <CurrencyIcon />
      </div>
    </div>
  );
};

OrderElement.propTypes = {};

export default OrderElement;
