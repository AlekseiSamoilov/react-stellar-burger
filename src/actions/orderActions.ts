import { PLACE_ORDER_START, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL, CLOSE_MODAL } from "./actionTypes";
import { TServerResponse, fetchWithRefresh } from "../utils/request";
import { resetConstructor } from "./constructorActions";
import { AppDispatch, AppThunk } from "../services/store";
import { IOrdersDetails } from "../services/types/data";

export type TPlaceOrderStartAction = {
  readonly type: typeof PLACE_ORDER_START;
}

export type TPlaceOrderSuccessAction = {
  readonly type: typeof PLACE_ORDER_SUCCESS;
  payload: number;
}

export type TPlaceOrderFailAction = {
  readonly type: typeof PLACE_ORDER_FAIL;
  payload: string;
}

type TOrderResponse = TServerResponse <{
  message?: string;
  order: IOrdersDetails;
}>


export type TCloseModal = {
  readonly type: typeof CLOSE_MODAL;
}

export type TOrderActions = 
| TPlaceOrderStartAction
| TPlaceOrderSuccessAction
| TPlaceOrderFailAction;

export const placeOrderStart = (): TPlaceOrderStartAction => ({
    type: PLACE_ORDER_START,
})

export const placeOrderSuccess = (orderNumber: number): TPlaceOrderSuccessAction => ({
    type: PLACE_ORDER_SUCCESS,
    payload: orderNumber,
});

export const placeOrderFail = (error: string): TPlaceOrderFailAction => ({
    type: PLACE_ORDER_FAIL,
    payload: error,
});

export const closeModal = (): TCloseModal => ({
    type: CLOSE_MODAL,
});

export const placeOrder = (ingredients: string[]): AppThunk => async (dispatch: AppDispatch): Promise<TOrderResponse> => {
    const token = localStorage.getItem("token");
    dispatch(placeOrderStart());
    try {
      const result = await fetchWithRefresh<TOrderResponse>("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || '',
        },
        body: JSON.stringify({ ingredients }),
      });
      dispatch(placeOrderSuccess(result.order.number));
      dispatch(resetConstructor());
      return result;
    } catch (error) {
      let errorMessage: string = error instanceof Error ? error.message : "Произошла чудовищная ошибка!";
      dispatch(placeOrderFail(errorMessage));
      throw error;
    }
};