
import { IOrdersDetails } from "../services/types/data";
import { OPEN_USER_WS_CONNECTION, CLOSE_USER_WS_CONNECTION, UPDATE_USER_ORDERS } from "./actionTypes";

export type TOpenUserWsConnectionAction = {
  readonly type: typeof OPEN_USER_WS_CONNECTION;
}

export type TCloseUserWsConnectionAction = {
  readonly type: typeof CLOSE_USER_WS_CONNECTION;
}

export interface IUserOrders {
  orders: IOrdersDetails;
}

export type TUpdateUserOrders = {
  readonly type: typeof UPDATE_USER_ORDERS;
  payload: IUserOrders;
}

export const openUserWsConnection = (): TOpenUserWsConnectionAction => {
    return {
      type: OPEN_USER_WS_CONNECTION,
    };
  };
  
  export const closeUserWsConnection = (): TCloseUserWsConnectionAction => {
    return {
      type: CLOSE_USER_WS_CONNECTION,
    };
  };

  export const updateUserOrders = ( orders: IUserOrders ): TUpdateUserOrders => ({
    type: UPDATE_USER_ORDERS,
    payload: orders,
});
