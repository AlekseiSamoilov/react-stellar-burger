import { CLOSE_MODAL, CLOSE_WS_CONNECTION, OPEN_WS_CONNECTION, UPDATE_ORDERS } from "./actionTypes";


export const openWsConnection = () => ({ type: OPEN_WS_CONNECTION });
export const closeWsConnection = () => ({ type: CLOSE_WS_CONNECTION });
export const updateOrders = (orders) => ({ 
    type: UPDATE_ORDERS,
    payload: orders,
});
