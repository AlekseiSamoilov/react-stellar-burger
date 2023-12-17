import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCES, RESET_PASSWORD_FAILURE, RESET_PASSWORD_BEGIN, PASSWORD_REQUEST_SUCCES, PASSWORD_REQUEST_FAILURE } from "./actionTypes";
import { request } from "../utils/request";

export const resetPasswordRequest = (email) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const data = await request('/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        // const data = await res.json();
        if (data.success) {
            dispatch({ type: PASSWORD_REQUEST_SUCCES, payload: data });
        } else {
            dispatch({ type: PASSWORD_REQUEST_FAILURE, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: PASSWORD_REQUEST_FAILURE, payload: error.message });
    }
};

export const resetPassword = (password, token) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_BEGIN });
        const data = await request('/password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, token }),
        });
        // const data = await res.json();
        if (data.success) {
            dispatch({ type: RESET_PASSWORD_SUCCES, payload: data });
        } else {
            dispatch({ type: RESET_PASSWORD_FAILURE, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
    }
};