// orderReducer.js
import { PLACE_ORDER_FAIL, PLACE_ORDER_START, PLACE_ORDER_SUCCESS } from '../actions/actionTypes';

const initialOrderState = {
  order: null,
  isLoading: false,
  error: null,
};

export const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case PLACE_ORDER_START:
        return {
            ...state,
            isLoading: true,
        };
    case PLACE_ORDER_SUCCESS:
        return {
            ...state,
            isLoading: false,
            order: action.payload,
        };
    case PLACE_ORDER_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.payload,
        };
      default:
          return state;
  }
};
