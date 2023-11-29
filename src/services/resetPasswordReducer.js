import { RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCES, RESET_PASSWORD_BEGIN, PASSWORD_REQUEST_SUCCES, PASSWORD_REQUEST_FAILURE } from "../actions/actionTypes";

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const passwordRequestResetReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST: 
            return { ...state, loading: true, error: null };
        case PASSWORD_REQUEST_SUCCES:
            return {...state, loading: false, error: null, success: true };
        case PASSWORD_REQUEST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const passwordResetReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_BEGIN: 
            return { ...state, loading: true, error: null };
        case RESET_PASSWORD_SUCCES:
            return {...state, loading: false, error: null, success: true };
        case RESET_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};