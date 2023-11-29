import { request } from "../utils/request";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "./actionTypes";

export const loginUser = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const data = await request('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const data = await request('/auth/logout', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }),
        });
        if (data.success) {
            localStorage.removeItem('refreshToken');
            dispatch({ type: LOGOUT_SUCCESS });
        } else {
            dispatch({ type: LOGOUT_FAILURE, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: LOGOUT_FAILURE, payload: error });
    }
};