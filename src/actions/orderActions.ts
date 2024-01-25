import { PLACE_ORDER_START, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL, CLOSE_MODAL, OPEN_MODAL } from "./actionTypes";
import { fetchWithRefresh } from "../utils/request";
import { TResetConstructorAction, resetConstructor } from "./constructorActions";
import { TIngredient } from "../services/types";
import { Dispatch } from "redux";

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

export type TOpenModal = {
  readonly type: typeof OPEN_MODAL;
  payload: any;
}

export type TCloseModal = {
  readonly type: typeof CLOSE_MODAL;
}

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

export const openModal = (modalContent: any): TOpenModal => ({
    type: OPEN_MODAL,
    payload: modalContent,
});

export const closeModal = (): TCloseModal => ({
    type: CLOSE_MODAL,
});

export const placeOrder = (ingredients: string[]) => async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");
    dispatch<TPlaceOrderStartAction>(placeOrderStart());
    try {
      const result = await fetchWithRefresh("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || '',
        },
        body: JSON.stringify({ ingredients }),
      });
      dispatch<TPlaceOrderSuccessAction>(placeOrderSuccess(result.order.number));
      dispatch<TResetConstructorAction>(resetConstructor());

    } catch (error) {
      let errorMessage: string = error instanceof Error ? error.message : "Произошла чудовищная ошибка!";
      dispatch<TPlaceOrderFailAction>(placeOrderFail(errorMessage));
    }
};