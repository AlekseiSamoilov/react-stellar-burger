import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import OrderItem from "./order-item";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  openWsConnection,
  closeWsConnection,
  updateUserOrders,
} from "../../actions/ordersActions";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.userOrders);
  console.log("state from OrderHistory:", orders);

  useEffect(() => {
    let accessToken = localStorage.getItem("token");

    if (!accessToken) {
      console.log("access error");
      return;
    }
    accessToken = accessToken.replace("Bearer ", "");
    const ws = new WebSocket(
      `wss://norma.nomoreparties.space/orders?token=${accessToken}`
    );

    ws.onopen = () => {
      dispatch(openWsConnection());
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket data received:", data);
      if (data.success) {
        const sortedOrders = data.orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        dispatch(updateUserOrders(sortedOrders));
      } else {
        console.log("WebSocket Error", data.message);
      }
    };
    ws.onerror = (error) => {
      console.log("WebSocket Error:", error);
    };
    return () => {
      ws.close();
      dispatch(closeWsConnection());
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
