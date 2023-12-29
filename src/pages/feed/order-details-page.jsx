import OrderInformation from "../../components/modal/order-information/order-information";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrderDetails } from "../../actions/ordersActions";

const OrderDetailsPage = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.currentOrder);

  useEffect(() => {
    if (!order || order.number !== parseInt(number, 10)) {
      dispatch(fetchOrderDetails(number));
    }
  }, [number, dispatch, order]);

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
