
import { OPEN_USER_WS_CONNECTION, CLOSE_USER_WS_CONNECTION, UPDATE_USER_ORDERS } from "./actionTypes";

export const openUserWsConnection = () => {
    return {
      type: OPEN_USER_WS_CONNECTION,
    };
  };
  
  export const closeUserWsConnection = () => {
    return {
      type: CLOSE_USER_WS_CONNECTION,
    };
  };

  export const updateUserOrders = ( orders ) => ({
    type: UPDATE_USER_ORDERS,
    payload: orders,
});
