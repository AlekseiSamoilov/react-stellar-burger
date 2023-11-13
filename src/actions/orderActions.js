import { PLACE_ORDER_START, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL } from "./actionTypes";

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