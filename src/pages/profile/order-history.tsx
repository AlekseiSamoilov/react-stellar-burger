import style from "./profile.module.css";
import OrderItem from "./order-item";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";
import {
  closeUserWsConnection,
  openUserWsConnection,
} from "../../actions/userActions";
import { IRootState } from "../../services/rootReducer";
import { TDispatch } from "../../services/store";

const OrderHistory: FC = () => {
  const dispatch: TDispatch = useDispatch();
  const orders = useSelector((state: IRootState) => state.orders.userOrders);

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
