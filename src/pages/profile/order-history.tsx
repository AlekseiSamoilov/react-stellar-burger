import style from "./profile.module.css";
import OrderItem from "./order-item";
import { FC, useEffect } from "react";
import {
  closeUserWsConnection,
  openUserWsConnection,
} from "../../actions/userActions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

const OrderHistory: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.orders.userOrders);

  useEffect(() => {
    dispatch(openUserWsConnection());
    return () => {
      dispatch(closeUserWsConnection());
    };
  }, [dispatch]);

  return (
    <div className={style.order_container}>
      {orders.map((order) => (
        <OrderItem key={order._id} order={order} fromProfile={true} />
      ))}
    </div>
  );
};

export default OrderHistory;
