import { CLOSE_WS_CONNECTION, OPEN_WS_CONNECTION, UPDATE_ORDERS } from "../actions/actionTypes";

let socket = null;

const wsMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case OPEN_WS_CONNECTION:
            socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');

            socket.open = () => {
                console.log("connetion ok");
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                // console.log(event.data)
                if (data.success) {
                    store.dispatch({ type: UPDATE_ORDERS, payload: data.orders });
                }
            };

            socket.onerror = (error) => {
                console.log("WebSocket error:", error);
            };

            socket.onclose = () => {
                console.log("connection closed");
            };
            break;
        case CLOSE_WS_CONNECTION:
            if (socket !== null) {
                socket.close();
                socket = null;
            }
            break;
        default:
            return next(action);
    }
};

export default wsMiddleware;