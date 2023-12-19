import { combineReducers } from "redux";
import { constrcutorReducer } from "./constructorReducer";
import { orderReducer } from "./orderReducer";
import { loadData } from "./dataLoadReducer";
import { passwordResetReducer, passwordRequestResetReducer } from "./resetPasswordReducer";
import { authReducer } from "./authReducer";
import { ordersReducer } from "./ordersReducer";

export const rootReducer = combineReducers({
    burger: constrcutorReducer,
    order: orderReducer,
    load: loadData,
    passwordReset: passwordResetReducer,
    passwordRequest: passwordRequestResetReducer,
    auth: authReducer,
    orders: ordersReducer,
});