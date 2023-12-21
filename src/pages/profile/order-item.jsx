import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderItem = ({ order }) => {
  const ingredientsData = useSelector((state) => state.load.allIngredients);

  const ingredientsPrice = order.ingredients.map(
    (id) => ingredientsData.find((ingredient) => ingredient._id === id)?.price
  );

  const totalPrice = ingredientsPrice.reduce((acc, price) => acc + price, 0);

  const ingredientImages = order.ingredients.map(
    (id) => ingredientsData.find((ingredient) => ingredient._id === id)?.image
  );

  return (
    <Link to={`/feed/${order.number}`} className={style.burger_container}>
      <div className={style.burger_item_box}>
        <div className={style.header}>
          <span className={style.order_number}>#{order.number}</span>
          <span className={style.timestamp}>{order.createdAt}</span>
        </div>
        <h1 className={style.title}>{order.name}</h1>
        <div className={style.status}>
          {order.status === "done" ? "Готов" : "Готовится"}
        </div>
        <div className={style.bottom}>
          <div className={style.items}>
            {ingredientImages.map((image, index) => (
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
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
