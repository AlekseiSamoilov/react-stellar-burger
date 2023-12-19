import { UPDATE_ORDERS } from "../actions/actionTypes"

const initialState = {
    orders: [],
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };

        default:
            return state;
    }
};