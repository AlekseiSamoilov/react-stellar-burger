import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_REQUEST, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, AUTH_CHECK_COMPLETE } from "../actions/actionTypes";
import { IAuthCheckComplete, ILoginFailureAction, ILoginRequestAction, ILoginSuccessAction, ILogoutFailure, ILogoutRequest, ILogoutSuccess, IUpdateUserFailure, IUpdateUserRequest, IUpdateUserSuccess } from "../actions/authActions";
import { IUserData } from "./types/data";

export interface IAuthState {
    user: IUserData | null;
    accessToken: string | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    isLoggedIn: boolean;
    isAuthChecked: boolean;
}

type TAuthActions = 
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailureAction
    | ILogoutRequest
    | ILogoutSuccess
    | ILogoutFailure
    | IUpdateUserRequest
    | IUpdateUserSuccess
    | IUpdateUserFailure
    | IAuthCheckComplete;

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  isLoggedIn: false,
  isAuthChecked: false,
};

export const authReducer = (state = initialState, action: TAuthActions) => {
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
        case UPDATE_USER_REQUEST: 
            return { ...state, isLoading: true, isError: false, errorMessage: '' };
        case UPDATE_USER_SUCCESS: 
            return { 
                ...state, 
                isLoading: false, 
            };
        case UPDATE_USER_FAILURE:
            return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
        case AUTH_CHECK_COMPLETE: 
            return { ...state, isAuthChecked: true };

        default:
            return state;
    }
};

