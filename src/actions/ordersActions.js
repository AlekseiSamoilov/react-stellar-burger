import { CLOSE_MODAL, CLOSE_WS_CONNECTION, OPEN_WS_CONNECTION, SET_CURRENT_ORDER, UPDATE_ORDERS, UPDATE_USER_ORDERS, FETCH_ORDER_DETAILS_SUCCESS } from "./actionTypes";


export const openWsConnection = () => ({ type: OPEN_WS_CONNECTION });
export const closeWsConnection = () => ({ type: CLOSE_WS_CONNECTION });

export const updateOrders = (orders) => ({ 
    type: UPDATE_ORDERS,
    payload: orders,
});

export const setCurrentOrder = (order) => ({
    type: SET_CURRENT_ORDER,
    payload: order,
});


export const fetchOrderDetails = (orderNumber) => async (dispatch) => {
  try {
    const response = await fetch(`https://norma.nomoreparties.space/api/orders/${orderNumber}`);
    const data = await response.json();

    if (response.ok && data.orders && data.orders.length > 0) {
      dispatch({ type: FETCH_ORDER_DETAILS_SUCCESS, payload: data.orders[0] });
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
