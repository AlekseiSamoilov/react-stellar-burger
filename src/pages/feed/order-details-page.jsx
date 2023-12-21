import OrderInformation from "../../components/modal/order-information/order-information";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const OrderDetailsPage = () => {
  const { number } = useParams();
  console.log(number);
  const order = useSelector((state) =>
    state.orders.orders.find((order) => order.number === parseInt(number, 10))
  );
  console.log(order);

  if (!order) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <OrderInformation order={order} />
    </div>
  );
};
export default OrderDetailsPage;
