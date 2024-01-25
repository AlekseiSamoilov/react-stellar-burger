import React from "react";
import { useNavigate, useLocation, Location, NavigateFunction } from "react-router-dom";
import Modal from "./modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import OrderInformation from "./order-information/order-information";
import OrderDetails from "./order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { closeModal as closeReduxModal } from "../../actions/orderActions";
import { TRootState } from "../../services/rootReducer";
import { Dispatch } from "redux";


function ModalWrapper() {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const dispatch: Dispatch = useDispatch();
  const isModal = location.state?.modal;
  const modalIngredient = isModal ? location.state.ingredient : undefined;
  const modalOrder = isModal ? location.state.order : undefined;
  const orderData = useSelector((state: TRootState) => state.order.orderNumber);
  const showOrderDetails = useSelector((state: TRootState) => state.order.showOrderDetails);

  const closeModal = () => {
    if (showOrderDetails) {
      dispatch(closeReduxModal());
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      {modalIngredient && (
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={modalIngredient} />
        </Modal>
      )}
      {modalOrder && (
        <Modal closeModal={closeModal}>
          <OrderInformation order={modalOrder} />
        </Modal>
      )}
      {showOrderDetails && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={orderData} />
        </Modal>
      )}
    </>
  );
}

export default ModalWrapper;
