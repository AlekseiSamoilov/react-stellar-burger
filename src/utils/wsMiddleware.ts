import { AnyAction, MiddlewareAPI, Dispatch } from "redux";
import { OPEN_WS_CONNECTION,
         CLOSE_WS_CONNECTION,  
         WS_CONNECTION_CLOSED, 
         WS_CONNECTION_ERROR, 
         WS_CONNECTION_SUCCESS 
} from "../actions/actionTypes";
import { TCloseWsConnectionAction, TOpenWsConnectionAction, updateOrders } from "../actions/ordersActions";
import { AppDispatch } from "../services/store";

type TWsActions = TOpenWsConnectionAction | TCloseWsConnectionAction | TWsConnenctionSuccess | TWsConnectionError | TWsConnectionClosed ;

export type TWsConnenctionSuccess = {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export type TWsConnectionError = {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export type TWsConnectionClosed = {
    readonly type : typeof WS_CONNECTION_CLOSED;
}


let socket: WebSocket | null = null;

const wsMiddleware = (store: MiddlewareAPI<AppDispatch>) => (next: AppDispatch) => (action: TWsActions) => {

    const onOpen = () => {
        console.log("Feed connection ok");
        store.dispatch ({ type: WS_CONNECTION_SUCCESS });
    };

    const onMessage = (event: {data: string}) => {
        const data = JSON.parse(event.data);
        if (data.success) {
            store.dispatch(updateOrders(data.orders));
        }
    };
    const onError = (error: Event) => {
        console.log("Feed connection error:", error);
        store.dispatch({ type: WS_CONNECTION_ERROR });
    };

    const onClose = () => {
        console.log("Feed connection closed")
        store.dispatch({ type: WS_CONNECTION_CLOSED });
    };

    switch (action.type) {
        case OPEN_WS_CONNECTION:
            socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');
            socket.onopen = onOpen;
            socket.onmessage = onMessage;
            socket.onerror = onError;
            socket.onclose = onClose;
            break;
        case CLOSE_WS_CONNECTION:
            if (socket) {
                socket.close();
            }
            break;
            default: 
            return next(action);
    }
};

export default wsMiddleware;
