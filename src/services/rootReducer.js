import { combineReducers } from "redux";
import { constrcutorWork } from "./constructorReducer";
import { orderReducer } from "./orderReducer";
import { loadData } from "./dataLoadReducer";

export const rootReducer = combineReducers({
    burger: constrcutorWork,
    order: orderReducer,
    load: loadData,
});