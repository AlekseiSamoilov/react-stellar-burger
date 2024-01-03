import { request } from "../utils/request";
import { REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST } from "./actionTypes";

export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const data = await request('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
        let errorMessage = "Ошибка при регистрации, проверьте данные и попробуйте снова."
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    }
};