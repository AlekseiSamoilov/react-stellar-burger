import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCES, RESET_PASSWORD_FAILURE, RESET_PASSWORD_BEGIN, PASSWORD_REQUEST_SUCCES, PASSWORD_REQUEST_FAILURE } from "./actionTypes";
import { TServerResponse, request } from "../utils/request";
import { Dispatch } from "redux";
import { IResetPasswordState } from "../services/resetPasswordReducer";
import { AppDispatch, AppThunk } from "../services/store";
import { TRootState } from "../services/rootReducer";

export type TResetPasswordRequestAction = {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export type TResetPasswordRequestSuccessAction = {
    readonly type: typeof PASSWORD_REQUEST_SUCCES;
    payload: IResetPasswordState; 
}

export type TResetPasswordRequestFailureAction = {
    readonly type: typeof PASSWORD_REQUEST_FAILURE;
    payload: string | undefined;
}

export type TResetPasswordActions = 
    | TResetPasswordRequestAction
    | TResetPasswordRequestSuccessAction
    | TResetPasswordRequestFailureAction
    | TResetPasswordBeginAction
    | TResetPasswordFailureAction
    | TResetPasswordSuccessAction;

type TResetPasswordResponse = TServerResponse <{
    message?: string;
} & IResetPasswordState>;

export const resetPasswordRequest = (email: string): AppThunk<Promise<unknown>> => async (dispatch: AppDispatch): Promise<TResetPasswordResponse> => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const data = await request<TResetPasswordResponse>('/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (data.success) {
            dispatch({ type: PASSWORD_REQUEST_SUCCES, payload: data });
        } else {
            dispatch({ type: PASSWORD_REQUEST_FAILURE, payload: data.message });
        }
        return data;
    } catch (error) {
        let errorMessage = (error instanceof Error) ? error.message : 'Произошла ошибка запроса сброса пароля.'
        dispatch({ type: PASSWORD_REQUEST_FAILURE, payload: errorMessage });
        throw error;
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
    payload: string | undefined;
}


export const resetPassword = (password: string, token: string): AppThunk<Promise<unknown>> => async (dispatch: AppDispatch): Promise<TResetPasswordResponse> => {
    try {
        dispatch({ type: RESET_PASSWORD_BEGIN });
        const data = await request<TResetPasswordResponse>('/password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, token }),
        });
        if (data.success) {
            dispatch({ type: RESET_PASSWORD_SUCCES, payload: data });
        } else {
            dispatch({ type: RESET_PASSWORD_FAILURE, payload: data.message });
        }
        return data;
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: error instanceof Error ? error.message : 'Произошла ошибка сброса пароля. Повторите попозже' });
        throw error;
    }
};