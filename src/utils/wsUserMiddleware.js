import { CLOSE_USER_WS_CONNECTION, OPEN_USER_WS_CONNECTION, USER_WS_CONNECTION_CLOSED, USER_WS_CONNECTION_ERROR, USER_WS_CONNECTION_SUCCESS } from "../actions/actionTypes";
import { updateUserOrders } from "../actions/userActions";


let socket = null;

const wsUserMiddleware = (store) => (next) => (action) => {

    const onOpen = () => {
        console.log("User connection ok");
        store.dispatch({ type: USER_WS_CONNECTION_SUCCESS });
    };
    const onMessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.success) {
            const sordtedOrders = data.orders.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            store.dispatch(updateUserOrders(sordtedOrders));
        }
    };
    const onError = (error) => {
        console.log("User connection error:", error);
        store.dispatch({ type: USER_WS_CONNECTION_ERROR });
    };
    const onClose = () => {
        console.log("User connection closed");
        store.dispatch({ type: USER_WS_CONNECTION_CLOSED });
    };

    switch (action.type) {
        case OPEN_USER_WS_CONNECTION:
            const accessToken = localStorage.getItem("token").replace("Bearer ", "");
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