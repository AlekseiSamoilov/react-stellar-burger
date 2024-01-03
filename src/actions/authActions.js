import { fetchWithRefresh, request } from "../utils/request";
import { LOGIN_REQUEST, 
         LOGIN_SUCCESS, 
         LOGIN_FAILURE, 
         LOGOUT_REQUEST, 
         LOGOUT_SUCCESS, 
         LOGOUT_FAILURE, 
         UPDATE_USER_REQUEST, 
         UPDATE_USER_SUCCESS, 
         UPDATE_USER_FAILURE, 
         AUTH_CHECK_COMPLETE, 
        } from "./actionTypes";

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
        localStorage.setItem('userData', JSON.stringify(data.user));
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        dispatch(authCheckComplete());
    } catch (error) {
        let errorMessage = 'Произошла ошибка при входе.';
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        dispatch(authCheckComplete());
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
            localStorage.removeItem('userData');
            dispatch({ type: LOGOUT_SUCCESS, payload: data });
            dispatch(authCheckComplete());
        } else {
            dispatch({ type: LOGOUT_FAILURE, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: LOGOUT_FAILURE, payload: error });
        dispatch(authCheckComplete());
    }
};

export const updateUserInfo = (userData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const data = await fetchWithRefresh('/auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(userData),
        });
        if (data.success) {
            dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
            dispatch(authCheckComplete());
            localStorage.setItem('userData', JSON.stringify(data.user));
        } else {
            dispatch({ type: UPDATE_USER_FAILURE, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
        dispatch(authCheckComplete());
    }
};

export const checkAndRestoreSession = () => async (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
        dispatch({ type: LOGIN_FAILURE });
        dispatch(authCheckComplete());
        return;
    }

    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await fetchWithRefresh('/auth/user', {
            method: 'GET',
            headers: { 'Authorization': token },
        });
        dispatch({ type: LOGIN_SUCCESS, payload: response });
        dispatch(authCheckComplete());
    } catch (error) {
        console.error('Error session restoration:', error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
        dispatch(authCheckComplete());
    }
};

export const authCheckComplete = () => {
    return { type: AUTH_CHECK_COMPLETE };
};