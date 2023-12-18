import React from "react";
import style from "./feed.module.css";
import OrderItem from "../profile/order-item";
import { Link } from "react-router-dom";

const Feed = () => {
  return (
    <div className={style.feed_container}>
      <h1 className={style.feed_title}>Лента заказов</h1>
      <div className={style.feed_window}>
        <div className={`${style.feed_qu} custom-scroll`}>
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </div>
        <div className={style.feed_info}>
          <div className={style.header_container}>
            <div className={style.feed_ready}>
              <h2 className={style.info_title}>Готовы:</h2>
              <p className="text text_type_digits-default">273641</p>
              <p className="text text_type_digits-default">273641</p>
              <p className="text text_type_digits-default">273641</p>
              <p className="text text_type_digits-default">273641</p>
              <p className="text text_type_digits-default">273641</p>
              <p className="text text_type_digits-default">273641</p>
            </div>
            <div className={style.feed_stady}>
              <h2 className={style.info_title}>В работе:</h2>
              <p className="text text_type_digits-default">273641</p>
              <p className="text text_type_digits-default">273641</p>
              <p className="text text_type_digits-default">273641</p>
              <p className="text text_type_digits-default">273641</p>
              <p className="text text_type_digits-default">273641</p>
            </div>
          </div>
          <div className={style.total}>
            <h3 className={style.total_title}>Выполнено за всё время:</h3>
            <p className="text text_type_digits-large">28 752</p>
          </div>
          <div className={style.total}>
            <h3 className={style.total_title}>Выполнено сегодня:</h3>
            <p className="text text_type_digits-large">138</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
