// orderReducer.js
import { CLOSE_MODAL, OPEN_MODAL, PLACE_ORDER_FAIL, PLACE_ORDER_START, PLACE_ORDER_SUCCESS } from '../actions/actionTypes';

const initialOrderState = {
  order: null,
  isLoading: false,
  error: null,
  showModal: false,
  orderNumber: null,
  modalContent: undefined,
  showOrderDetails: false,
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
            showModal: true,
            orderNumber: action.payload,
            showOrderDetails: true,
        };
    case PLACE_ORDER_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.payload,
        };
    case OPEN_MODAL:
        return {
          ...state,
          showModal: true,
          modalContent: action.payload,
        };
    case CLOSE_MODAL:
        return {
          ...state,
          showModal: false,
          modalContent: undefined,
          showOrderDetails: false,
        };

      default:
          return state;
  }
};
