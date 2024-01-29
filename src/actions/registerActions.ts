import { Dispatch } from "redux";
import { IRegisterUserData } from "../services/types/data";
import { TServerResponse, request } from "../utils/request";
import { REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST } from "./actionTypes";
import { IRegisterPageForm } from "../pages/register";
import { AppDispatch, AppThunk } from "../services/store";

export type TRegisterUserRequestAction = {
    readonly type: typeof REGISTER_REQUEST;
}

export type TRegisterSuccessAction = {
    readonly type: typeof REGISTER_SUCCESS;
    payload: IRegisterUserData;
}
export type TRegisterFailureAction = {
    readonly type: typeof REGISTER_FAILURE;
    payload: string;
}

export type TRegisterActions = 
    | TRegisterUserRequestAction
    | TRegisterSuccessAction
    | TRegisterFailureAction;

type TRegisterResponse = TServerResponse<IRegisterUserData>

export const registerUser = (userData: IRegisterPageForm): AppThunk<Promise<unknown>> => async (dispatch: AppDispatch): Promise<TRegisterResponse> => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const data = await request<TRegisterResponse>('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        dispatch({ type: REGISTER_SUCCESS, payload: data });
        return data;
    } catch (error) {
        let errorMessage = "Ошибка при регистрации, проверьте данные и попробуйте снова."
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
        throw error;
    }
};