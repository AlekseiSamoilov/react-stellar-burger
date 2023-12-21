import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-element.module.css";
import { useSelector } from "react-redux";

const OrderElement = ({ ingredientId, count }) => {
  const ingredientsData = useSelector((state) => state.load.allIngredients);
  const ingredient = ingredientsData.find((item) => item._id === ingredientId);
  return (
    <div className={style.element_container}>
      <div className={style.item_container}>
        <div className={style.item}>
          <img className={style.item_image} src={ingredient?.image} />
        </div>
        <p className={style.item_name}>{ingredient?.name}</p>
      </div>
      <div className={style.price_container}>
        <p className={style.price_count}>{count}</p>
        <p className={style.price_count}>x</p>
        <p className={style.price_count}>{ingredient?.price}</p>
        <CurrencyIcon />
      </div>
    </div>
  );
};

OrderElement.propTypes = {};

export default OrderElement;
