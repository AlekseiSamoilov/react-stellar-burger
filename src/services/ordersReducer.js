import { SET_CURRENT_ORDER, UPDATE_ORDERS, UPDATE_USER_ORDERS, FETCH_ORDER_DETAILS_SUCCESS } from "../actions/actionTypes"

const initialState = {
    orders: [],
    userOrders: [],
    currentOrder: null,
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };
        case UPDATE_USER_ORDERS:
            return {
                ...state,
                userOrders: action.payload,
            };
        case SET_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: action.payload,
            };
        case FETCH_ORDER_DETAILS_SUCCESS:
            console.log("Updating current order:", action.payload);
            return {
                ...state,
                currentOrder: action.payload,
                };
        default:
            return state;
    }
};

