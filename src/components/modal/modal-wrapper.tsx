import React from "react";
import { useNavigate, useLocation, Location, NavigateFunction } from "react-router-dom";
import Modal from "./modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import OrderInformation from "./order-information/order-information";
import OrderDetails from "./order-details/order-details";
import { closeModal as closeReduxModal } from "../../actions/orderActions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";


function ModalWrapper() {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const dispatch = useAppDispatch();
  const isModal = location.state?.modal;
  const modalIngredient = isModal ? location.state.ingredient : undefined;
  const modalOrder = isModal ? location.state.order : undefined;
  const orderData = useAppSelector(state => state.order.orderNumber);
  const showOrderDetails = useAppSelector(state => state.order.showOrderDetails);

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
