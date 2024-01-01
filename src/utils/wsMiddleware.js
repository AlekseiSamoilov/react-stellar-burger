import { OPEN_WS_CONNECTION,
         CLOSE_WS_CONNECTION,  
         WS_CONNECTION_CLOSED, 
         WS_CONNECTION_ERROR, 
         WS_CONNECTION_SUCCESS 
} from "../actions/actionTypes";
import { updateOrders } from "../actions/ordersActions";

let socket = null;

const wsMiddleware = (store) => (next) => (action) => {

    const onOpen = () => {
        console.log("Feed connection ok");
        store.dispatch ({ type: WS_CONNECTION_SUCCESS });
    };

    const onMessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.success) {
            store.dispatch(updateOrders(data.orders));
        }
    };
    const onError = (error) => {
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
