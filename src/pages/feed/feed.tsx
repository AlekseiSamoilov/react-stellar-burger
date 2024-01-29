import React, { FC, useEffect, useMemo } from "react";
import style from "./feed.module.css";
import OrderItem from "../profile/order-item";
import {
  closeWsConnection,
  openWsConnection,
} from "../../actions/ordersActions";
import { IOrdersDetails } from "../../services/types/data";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

const Feed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(openWsConnection());

    return () => {
      dispatch(closeWsConnection());
    };
  }, [dispatch]);

  const orders = useAppSelector(state => state.orders.orders);

  const completedOrders = useMemo(
    () => orders.filter((order) => order.status === "done"),
    [orders]
  );

  const inProgressOrders = useMemo(
    () => orders.filter((order) => order.status === "pending"),
    [orders]
  );

  const splitOrders = (orders: IOrdersDetails[]): IOrdersDetails[][] => {
    const groups: IOrdersDetails[][] = [];
    for (let i = 0; i < orders.length; i += 20) {
      groups.push(orders.slice(i, i + 10));
    }
    return groups;
  };

  const orderColumns = (orderGroups: IOrdersDetails[][]): JSX.Element[] => {
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

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const ordersToday = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startOfToday;
  });

  return (
    <div className={style.feed_container}>
      <h1 className={style.feed_title}>Лента заказов</h1>
      <div className={style.feed_window}>
        <div className={`${style.feed_qu} custom-scroll`}>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} fromProfile={false} />
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
            <p className="text text_type_digits-large">{ordersToday.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
