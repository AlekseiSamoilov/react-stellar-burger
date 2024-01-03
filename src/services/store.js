import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";
import wsMiddleware from "../utils/wsMiddleware";
import wsUserMiddleware from "../utils/wsUserMiddleware";



export const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk, wsMiddleware, wsUserMiddleware)
        )
        
    );
    return store;
}

export const store = configureStore();
