import { AnyAction, MiddlewareAPI } from "redux";
import { CLOSE_USER_WS_CONNECTION, OPEN_USER_WS_CONNECTION, USER_WS_CONNECTION_CLOSED, USER_WS_CONNECTION_ERROR, USER_WS_CONNECTION_SUCCESS } from "../actions/actionTypes";
import { TCloseUserWsConnectionAction, TOpenUserWsConnectionAction, TUpdateUserOrders, updateUserOrders } from "../actions/userActions";
import { TRootState } from "../services/rootReducer";
import { AppDispatch } from "../services/store";

type TUserWsActions = TOpenUserWsConnectionAction | TCloseUserWsConnectionAction | TUpdateUserOrders | TUserWsConnectionSuccess | TUserWsConnectionError | TUserWsConnectionClose;

export type TUserWsConnectionSuccess = {
    readonly type: typeof USER_WS_CONNECTION_SUCCESS;
}
export type TUserWsConnectionError = {
    readonly type: typeof USER_WS_CONNECTION_ERROR;
}
export type TUserWsConnectionClose = {
    readonly type: typeof USER_WS_CONNECTION_CLOSED;
}

let socket: WebSocket | null = null;

const wsUserMiddleware = (store: MiddlewareAPI<AppDispatch, TRootState>) => (next: AppDispatch) => (action: TUserWsActions) => {

    const onOpen = () => {
        console.log("User connection ok");
        store.dispatch({ type: USER_WS_CONNECTION_SUCCESS });
    };
    const onMessage = (e: { data: string; }) => {
        const data = JSON.parse(e.data);
        if (data.success) {
            const sordtedOrders = data.orders.sort(
                (a: { createdAt: Date; }, b: { createdAt: Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            store.dispatch(updateUserOrders(sordtedOrders));
        }
    };
    const onError = (error: Event) => {
        console.log("User connection error:", error);
        store.dispatch({ type: USER_WS_CONNECTION_ERROR });
    };
    const onClose = () => {
        console.log("User connection closed");
        store.dispatch({ type: USER_WS_CONNECTION_CLOSED });
    };

    switch (action.type) {
        case OPEN_USER_WS_CONNECTION:
            let accessToken = localStorage.getItem("token");
            if (accessToken) {
                accessToken = accessToken.replace("Bearer ", "")
            } else {
                accessToken = '';
            }
            socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
            socket.onopen = onOpen;
            socket.onmessage = onMessage;
            socket.onerror = onError;
            socket.onclose = onClose;
            break;
        case CLOSE_USER_WS_CONNECTION:
            if (socket) {
                socket.close();
            }
            break;
            default: 
            return next(action);
    }
};

export default wsUserMiddleware;