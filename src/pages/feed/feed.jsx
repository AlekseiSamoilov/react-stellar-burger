import React, { useEffect } from "react";
import style from "./feed.module.css";
import OrderItem from "../profile/order-item";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeWsConnection,
  openWsConnection,
} from "../../actions/ordersActions";

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openWsConnection());

    return () => {
      dispatch(closeWsConnection());
    };
  }, [dispatch]);

  const orders = useSelector((state) => state.orders.orders);
  console.log(orders);

  const completedOrders = orders.filter((order) => order.status === "done");
  const inProgressOrders = orders.filter((order) => order.status === "pending");

  const splitOrders = (orders) => {
    const groups = [];
    for (let i = 0; i < orders.length; i += 20) {
      groups.push(orders.slice(i, i + 10));
    }
    return groups;
  };

  const orderColumns = (orderGroups) => {
    return orderGroups.map((group, index) => (
      <div key={index} className={style.feed_column}>
        {group.map((order) => (
          <p key={order._id} className="text text_type_digits-default">
            {order.number}
          </p>
        ))}
      </div>
    ));
  };

  const completedOrderGroups = splitOrders(completedOrders);
  const inProgressOrderGroups = splitOrders(inProgressOrders);

  return (
    <div className={style.feed_container}>
      <h1 className={style.feed_title}>Лента заказов</h1>
      <div className={style.feed_window}>
        <div className={`${style.feed_qu} custom-scroll`}>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
        <div className={style.feed_info}>
          <div className={style.header_container}>
            <div className={style.feed_ready}>
              <h2 className={style.info_title}>Готовы:</h2>
              <div className={style.feed_number_column}>
                {orderColumns(completedOrderGroups)}
              </div>
            </div>
            <div className={style.feed_stady}>
              <h2 className={style.info_title}>В работе:</h2>
              {orderColumns(inProgressOrderGroups)}
            </div>
          </div>
          <div className={style.total}>
            <h3 className={style.total_title}>Выполнено за всё время:</h3>
            <p className="text text_type_digits-large">
              {completedOrders.length}
            </p>
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
