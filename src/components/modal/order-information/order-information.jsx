import style from "./order-information.module.css";
import stylefeed from "../../../pages/profile/profile.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderElement from "./order-element/order-element";
import { useSelector } from "react-redux";

const OrderInformation = ({ order }) => {
  const ingredientsData = useSelector((state) => state.load.allIngredients);
  const ingredientCounts = order.ingredients.reduce((acc, id) => {
    const ingredient = ingredientsData.find((item) => item._id === id);
    if (ingredient && ingredient.type === "bun") {
      acc[id] = 2;
    } else {
      acc[id] = (acc[id] || 0) + 1;
    }
    return acc;
  }, {});

  const totalOrderPrice = order.ingredients.reduce((total, ingredientId) => {
    const ingredient = ingredientsData.find(
      (item) => item._id === ingredientId
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
        <p className={style.time_stamp}>{order.createdAt}</p>
        <div className={style.price}>
          <p className={style.price_text}>{totalOrderPrice}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

OrderInformation.propTypes = {};

export default OrderInformation;
