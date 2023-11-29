import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_REQUEST } from "../actions/actionTypes";

const initialState = {
    user: null,
  accessToken: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, isError: false, errorMessage: '' };
        case LOGIN_SUCCESS:
            return  { 
                ...state, 
                isLoading: false, 
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                isLoggedIn: true,
            };
        case LOGIN_FAILURE: 
            return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
        case LOGOUT_REQUEST:
            return { ...state, isLoading: true, isError: false, errorMessage: '' };
        case LOGOUT_SUCCESS: 
            return { ...initialState };
        default:
            return state;
    }
};