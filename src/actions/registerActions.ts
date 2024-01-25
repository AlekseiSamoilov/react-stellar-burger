import { Dispatch } from "redux";
import { IRegisterUserData } from "../services/types/data";
import { request } from "../utils/request";
import { REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST } from "./actionTypes";
import { IRegisterPageForm } from "../pages/register";

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

export const registerUser = (userData: IRegisterPageForm) => async (dispatch: Dispatch) => {
    dispatch<TRegisterUserRequestAction>({ type: REGISTER_REQUEST });
    try {
        const data = await request('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        dispatch<TRegisterSuccessAction>({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
        let errorMessage = "Ошибка при регистрации, проверьте данные и попробуйте снова."
        dispatch<TRegisterFailureAction>({ type: REGISTER_FAILURE, payload: errorMessage });
    }
};