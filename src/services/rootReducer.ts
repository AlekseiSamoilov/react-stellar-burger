import { combineReducers } from "redux";
import { IConstructorState, constructorReducer } from "./constructorReducer";
import { IPlaceOrderState, orderReducer } from "./orderReducer";
import { ILoadDataState, loadData } from "./dataLoadReducer";
import { passwordResetReducer, passwordRequestResetReducer, IResetPasswordState } from "./resetPasswordReducer";
import { IAuthState, authReducer } from "./authReducer";
import { IOrdersReducerState, ordersReducer } from "./ordersReducer";
import { IRegisterUserState, registerReducer } from "./registerReducer";

export const rootReducer = combineReducers({
    burger: constructorReducer,
    order: orderReducer,
    load: loadData,
    passwordReset: passwordResetReducer,
    passwordRequest: passwordRequestResetReducer,
    auth: authReducer,
    orders: ordersReducer,
    register: registerReducer,
});

export type TRootState = ReturnType<typeof rootReducer>

export interface IRootState {
    burger: IConstructorState;
    order: IPlaceOrderState;
    load: ILoadDataState;
    passwordReset: IResetPasswordState;
    passwordRequest: IResetPasswordState;
    auth: IAuthState;
    orders: IOrdersReducerState;
    register: IRegisterUserState;
}