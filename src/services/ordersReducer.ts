import { SET_CURRENT_ORDER, UPDATE_ORDERS, UPDATE_USER_ORDERS, FETCH_ORDER_DETAILS_SUCCESS } from "../actions/actionTypes"
import { TFetchOrderDetailsAction, TSetCurrentOrderAction, TUpdateOrdersAction } from "../actions/ordersActions";
import { TUpdateUserOrders } from "../actions/userActions";
import { IOrdersDetails } from "./types/data";

export interface IOrdersReducerState {
    orders: IOrdersDetails[];
    userOrders: IOrdersDetails[];
    currentOrder: IOrdersDetails | null;
}

type TOrdersReducerActions = 
    | TUpdateOrdersAction
    | TUpdateUserOrders
    | TSetCurrentOrderAction
    | TFetchOrderDetailsAction

const initialState: IOrdersReducerState = {
    orders: [],
    userOrders: [],
    currentOrder: null,
}

export const ordersReducer = (state = initialState, action: TOrdersReducerActions) => {
    switch (action.type) {
        case UPDATE_ORDERS:
            console.log("OrdersReducer Content", action.payload);
            return {
                ...state,
                orders: action.payload,
            };
        case UPDATE_USER_ORDERS:
            console.log("OrdersReducer Content2", action.payload);
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
            return {
                ...state,
                currentOrder: action.payload,
                };
        default:
            return state;
    }
};

