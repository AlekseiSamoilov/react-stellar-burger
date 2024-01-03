import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";
import { orderReducer } from "./orderReducer";
import { loadData } from "./dataLoadReducer";
import { passwordResetReducer, passwordRequestResetReducer } from "./resetPasswordReducer";
import { authReducer } from "./authReducer";
import { ordersReducer } from "./ordersReducer";
import { registerReducer } from "./registerReducer";

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