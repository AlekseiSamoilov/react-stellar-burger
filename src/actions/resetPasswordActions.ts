import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCES, RESET_PASSWORD_FAILURE, RESET_PASSWORD_BEGIN, PASSWORD_REQUEST_SUCCES, PASSWORD_REQUEST_FAILURE } from "./actionTypes";
import { request } from "../utils/request";
import { Dispatch } from "redux";
import { IResetPasswordState } from "../services/resetPasswordReducer";

export type TResetPasswordRequestAction = {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export type TResetPasswordRequestSuccessAction = {
    readonly type: typeof PASSWORD_REQUEST_SUCCES;
    payload: IResetPasswordState; 
}

export type TResetPasswordRequestFailureAction = {
    readonly type: typeof PASSWORD_REQUEST_FAILURE;
    payload: string;
}

export const resetPasswordRequest = (email: string) => async (dispatch: Dispatch) => {
    try {
        dispatch<TResetPasswordRequestAction>({ type: RESET_PASSWORD_REQUEST });
        const data = await request('/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (data.success) {
            dispatch<TResetPasswordRequestSuccessAction>({ type: PASSWORD_REQUEST_SUCCES, payload: data });
        } else {
            dispatch<TResetPasswordRequestFailureAction>({ type: PASSWORD_REQUEST_FAILURE, payload: data.message });
        }
    } catch (error) {
        let errorMessage = (error instanceof Error) ? error.message : 'Произошла ошибка запроса сброса пароля.'
        dispatch<TResetPasswordRequestFailureAction>({ type: PASSWORD_REQUEST_FAILURE, payload: errorMessage });
    }
};


export type TResetPasswordBeginAction = {
    readonly type: typeof RESET_PASSWORD_BEGIN;
}

export type TResetPasswordSuccessAction = {
    readonly type: typeof RESET_PASSWORD_SUCCES;
    payload: IResetPasswordState;
}

export type TResetPasswordFailureAction = {
    readonly type: typeof RESET_PASSWORD_FAILURE;
    payload: string;
}


export const resetPassword = (password: string, token: string) => async (dispatch: Dispatch) => {
    try {
        dispatch<TResetPasswordBeginAction>({ type: RESET_PASSWORD_BEGIN });
        const data = await request('/password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, token }),
        });
        if (data.success) {
            dispatch<TResetPasswordSuccessAction>({ type: RESET_PASSWORD_SUCCES, payload: data });
        } else {
            dispatch<TResetPasswordFailureAction>({ type: RESET_PASSWORD_FAILURE, payload: data.message });
        }
    } catch (error) {
        dispatch<TResetPasswordFailureAction>({ type: RESET_PASSWORD_FAILURE, payload: error instanceof Error ? error.message : 'Произошла ошибка сброса пароля. Повторите попозже' });
    }
};