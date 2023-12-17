import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../actions/actionTypes";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    isError: false,
    errorMessage: '',
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { ...state, isLoading: true, isError: false, errorMessage: '' };
        case REGISTER_SUCCESS:
            return { 
                ...state, 
                isLoading: false,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
            case REGISTER_FAILURE:
                return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
                default: 
                return state;
    }
};