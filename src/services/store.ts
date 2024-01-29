import { AnyAction, Store, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { TRootState, rootReducer } from "./rootReducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import wsMiddleware from "../utils/wsMiddleware";
import wsUserMiddleware from "../utils/wsUserMiddleware";
import { TAuthActions } from "../actions/authActions";
import { TOrderActions } from "../actions/orderActions";
import { TOrdersActions } from "../actions/ordersActions";
import { TRegisterActions } from "../actions/registerActions";
import { TResetPasswordActions } from "../actions/resetPasswordActions";

type TApplicationActions = 
| TAuthActions
| TOrderActions
| TOrdersActions
| TRegisterActions
| TResetPasswordActions;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    TRootState,
    unknown,
    TApplicationActions
>;

export const configureStore = (): Store<TRootState> => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk, wsMiddleware, wsUserMiddleware)
        )
        
    );
    return store;
}

export type AppDispatch = typeof store.dispatch;

export type TDispatch = ThunkDispatch<TRootState, void, AnyAction>;

export const store = configureStore();
