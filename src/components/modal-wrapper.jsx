import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./modal/modal";
import IngredientDetails from "./modal/ingredient-details/ingredient-details";
import OrderInformation from "./modal/order-information/order-information";
import OrderDetails from "./modal/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { closeModal as closeReduxModal } from "../actions/orderActions";

function ModalWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isModal = location.state?.modal;
  const modalIngredient = isModal && location.state.ingredient;
  const modalOrder = isModal && location.state.order;
  const orderData = useSelector((state) => state.order.orderNumber);
  const showOrderDetails = useSelector((state) => state.order.showOrderDetails);

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
