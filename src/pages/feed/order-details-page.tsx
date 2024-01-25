import OrderInformation from "../../components/modal/order-information/order-information";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";
import { fetchOrderDetails } from "../../actions/ordersActions";
import { IRootState } from "../../services/rootReducer";
import { AppDispatch } from "../../services/store";

const OrderDetailsPage: FC = () => {
  const { number } = useParams<{ number: string | undefined }>();
  const dispatch = useDispatch();
  const order = useSelector((state: IRootState) => state.orders.currentOrder);

  useEffect(() => {
    if (number) { 
      const orderNumber = parseInt(number, 10);
      if (!order || order.number !== orderNumber) {
        dispatch(fetchOrderDetails(orderNumber));
      }
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
