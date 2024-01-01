import style from "./profile.module.css";
import OrderItem from "./order-item";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  closeUserWsConnection,
  openUserWsConnection,
} from "../../actions/userActions";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.userOrders);

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
