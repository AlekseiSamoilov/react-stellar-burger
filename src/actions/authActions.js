import { request } from "../utils/request";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE} from "./actionTypes";

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
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userData', JSON.stringify(data.user));
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
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            dispatch({ type: LOGOUT_SUCCESS, payload: data });
        } else {
            dispatch({ type: LOGOUT_FAILURE, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: LOGOUT_FAILURE, payload: error });
    }
};

export const updateUserInfo = (userData) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const { auth } = getState();
        const accessToken = auth.accessToken;

        const data = await request('/auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
            body: JSON.stringify(userData),
        });
        if (data.success) {
            dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
            localStorage.setItem('userData', JSON.stringify(data.user));
        } else {
            dispatch({ type: UPDATE_USER_FAILURE, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    }
};

export const restoreSession = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const refreshToken = localStorage.getItem('refreshToken');
        const userData = localStorage.getItem('userData');
        const user = userData ? JSON.parse(userData) : null;

        if (token && isLoggedIn) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    accessToken: token,
                    refreshToken: refreshToken,
                    user: user, 
                },
            });
        }
    };
};