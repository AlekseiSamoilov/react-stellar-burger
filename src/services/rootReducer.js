import { combineReducers } from "redux";
import { constrcutorWork } from "./constructorReducer";
import { orderReducer } from "./orderReducer";
import { loadData } from "./dataLoadReducer";
import { passwordResetReducer, passwordRequestResetReducer } from "./resetPasswordReducer";
import { authReducer } from "./authReducer";
// import { userReducer } from "./userReducer";
// import { registerReducer } from "./registerReducer";

export const rootReducer = combineReducers({
    burger: constrcutorWork,
    order: orderReducer,
    load: loadData,
    passwordReset: passwordResetReducer,
    passwordRequest: passwordRequestResetReducer,
    auth: authReducer,
    // user: userReducer,
});