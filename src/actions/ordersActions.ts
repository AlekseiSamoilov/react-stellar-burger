import { Dispatch } from "redux";
import { CLOSE_WS_CONNECTION, OPEN_WS_CONNECTION, SET_CURRENT_ORDER, UPDATE_ORDERS, FETCH_ORDER_DETAILS_SUCCESS } from "./actionTypes";
import { AppDispatch, AppThunk } from "../services/store";

export type TOpenWsConnectionAction = {
  readonly type: typeof OPEN_WS_CONNECTION;
}

export type TCloseWsConnectionAction = {
  readonly type: typeof CLOSE_WS_CONNECTION;
}

export type TUpdateOrdersAction = {
  readonly type: typeof UPDATE_ORDERS;
  payload: IOrderDetails[];
}
export type TSetCurrentOrderAction = {
  readonly type: typeof SET_CURRENT_ORDER;
  payload: IOrderDetails;
}

export type TFetchOrderDetailsAction = {
  readonly type: typeof FETCH_ORDER_DETAILS_SUCCESS;
  payload: IOrderDetails;
}

export type TOrdersActions =
  | TOpenWsConnectionAction
  | TCloseWsConnectionAction
  | TUpdateOrdersAction
  | TSetCurrentOrderAction
  | TFetchOrderDetailsAction;

interface IOrderDetails {
  id: number;
}

interface IOrderReponse {
  orders: IOrderDetails[]
}

export const openWsConnection = (): TOpenWsConnectionAction => ({ type: OPEN_WS_CONNECTION });
export const closeWsConnection = (): TCloseWsConnectionAction => ({ type: CLOSE_WS_CONNECTION });

export const updateOrders = (orders: IOrderDetails[]): TUpdateOrdersAction => ({ 
    type: UPDATE_ORDERS,
    payload: orders,
});

export const setCurrentOrder = (order: IOrderDetails): TSetCurrentOrderAction => ({
    type: SET_CURRENT_ORDER,
    payload: order,
});


export const fetchOrderDetails = (orderNumber: number): AppThunk<Promise<unknown>> => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await fetch(`https://norma.nomoreparties.space/api/orders/${orderNumber}`);
    const data: IOrderReponse = await response.json();

    if (response.ok && data.orders && data.orders.length > 0) {
      dispatch({ type: FETCH_ORDER_DETAILS_SUCCESS, payload: data.orders[0] });
    } else {
      console.log('Error:', response.status);
    }
  } catch (error) {
    let errorMessage = "Произошла ошибка!"
    console.error('Error:', error instanceof Error ? error.message : errorMessage);
  }
};
