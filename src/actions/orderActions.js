import { PLACE_ORDER_START, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL, CLOSE_MODAL, OPEN_MODAL } from "./actionTypes";
import { fetchWithRefresh } from "../utils/request";
import { resetConstructor } from "./constructorActions";

export const placeOrderStart = () => ({
    type: PLACE_ORDER_START,
})

export const placeOrderSuccess = (orderNumber) => ({
    type: PLACE_ORDER_SUCCESS,
    payload: orderNumber,
});

export const placeOrderFail = (error) => ({
    type: PLACE_ORDER_FAIL,
    payload: error,
});

export const openModal = (modalContent) => ({
    type: OPEN_MODAL,
    payload: modalContent,
});

export const closeModal = () => ({
    type: CLOSE_MODAL,
});

export const placeOrder = (ingredients) => async (dispatch) => {
    console.log("palceOrder Called")
    const token = localStorage.getItem("token");
    dispatch(placeOrderStart());
    try {
      const result = await fetchWithRefresh("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ ingredients }),
      });
      dispatch(placeOrderSuccess(result.order.number));
      dispatch(resetConstructor());

    } catch (error) {
      console.log(error);
      dispatch(placeOrderFail(error));
    }
};