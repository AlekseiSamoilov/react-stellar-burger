// orderReducer.js
import { CLOSE_MODAL, OPEN_MODAL, PLACE_ORDER_FAIL, PLACE_ORDER_START, PLACE_ORDER_SUCCESS } from '../actions/actionTypes';
import { TCloseModal, TPlaceOrderFailAction, TPlaceOrderStartAction, TPlaceOrderSuccessAction } from '../actions/orderActions';

export interface IPlaceOrderState {
  order: number | null;
  isLoading: boolean;
  error: string | null;
  showModal: boolean;
  orderNumber: number | null;
  showOrderDetails: boolean;
}

type TPlaceOrderActions =
  | TPlaceOrderStartAction
  | TPlaceOrderSuccessAction
  | TPlaceOrderFailAction
  | TCloseModal;

const initialOrderState: IPlaceOrderState = {
  order: null,
  isLoading: false,
  error: null,
  showModal: false,
  orderNumber: null,
  showOrderDetails: false,
};

export const orderReducer = (state = initialOrderState, action: TPlaceOrderActions ) => {
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
    // case OPEN_MODAL:
    //   console.log(action.payload)
    //     return {
    //       ...state,
    //       showModal: true,
    //     };
    case CLOSE_MODAL:

        return {
          ...state,
          showModal: false,
          showOrderDetails: false,
        };

      default:
          return state;
  }
};
