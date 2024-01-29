import { Dispatch } from "redux";
import { TUserData, IUserData } from "../services/types/data";
import { TServerResponse, fetchWithRefresh, request } from "../utils/request";
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
import { AppDispatch, AppThunk, TDispatch } from "../services/store";

export interface IAuthCheckComplete {
    type: typeof AUTH_CHECK_COMPLETE;
}

type TLoginResponseData = {
    refreshToken: string;
    accessToken: string;
    user: IUserData;
    message?: string;
}

 export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    payload: TLoginResponseData;
}
export interface ILoginFailureAction {
    readonly type: typeof LOGIN_FAILURE;
    payload: string;
}


export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
    payload: TLoginResponseData;
}
export interface ILogoutFailure {
    readonly type: typeof LOGOUT_FAILURE;
    payload: string | undefined;
}


export interface IUpdateUserRequest {
    readonly type: typeof UPDATE_USER_REQUEST;
};
export interface IUpdateUserSuccess {
    readonly type: typeof UPDATE_USER_SUCCESS;
    payload: IUserData;
}
export interface IUpdateUserFailure {
    readonly type: typeof UPDATE_USER_FAILURE;
    payload: string;
}

export type TAuthActions = 
| ILoginRequestAction
| ILoginSuccessAction
| ILoginFailureAction
| IAuthCheckComplete
| ILogoutRequest
| ILoginSuccessAction
| ILoginFailureAction
| IUpdateUserRequest
| IUpdateUserSuccess
| IUpdateUserFailure;


type TCheckAndRestoreSession = TServerResponse<TLoginResponseData>

export const loginUser = (userData: IUserData): AppThunk<Promise<TLoginResponseData>> => async (dispatch: AppDispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const data: TLoginResponseData = await request<TCheckAndRestoreSession>('/auth/login', {
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
        return data;
    } catch (error) {
        let errorMessage = 'Произошла ошибка при входе. Проверьте данные.';
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        dispatch(authCheckComplete());
        throw error;
    }
};

export const logoutUser = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const data = await request<TCheckAndRestoreSession>('/auth/logout', {
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
        let errorMessage = "Произошла неизвестная ошибка.";
        dispatch({ type: LOGOUT_FAILURE, payload: errorMessage });
        dispatch(authCheckComplete());
    }
};

export const updateUserInfo = (userData: TUserData): AppThunk<Promise<unknown>> => async (dispatch: AppDispatch): Promise<TCheckAndRestoreSession> => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const token = localStorage.getItem('token') || '';
        const data = await fetchWithRefresh<TCheckAndRestoreSession>('/auth/user', {
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
        return data;
    } catch (error) {
        let errorMessage = "Произошла неизвестная ошибка.";
        dispatch({ type: UPDATE_USER_FAILURE, payload: errorMessage});
        dispatch(authCheckComplete());
        throw error;
    }
};



export const checkAndRestoreSession = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    const token = localStorage.getItem('token');

    if (!token) {
        dispatch(authCheckComplete());
        return;
    }

    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await fetchWithRefresh<TCheckAndRestoreSession>('/auth/user', {
            method: 'GET',
            headers: { 'Authorization': token },
        });
        dispatch({ type: LOGIN_SUCCESS, payload: response });
        dispatch(authCheckComplete());
    } catch (error) {
        dispatch(authCheckComplete());
    }
};


export const authCheckComplete = (): IAuthCheckComplete => {
    return { type: AUTH_CHECK_COMPLETE };
};