import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../actions/actionTypes";
import { TRegisterFailureAction, TRegisterSuccessAction, TRegisterUserRequestAction } from "../actions/registerActions";
import { IRegisterUserData } from "./types/data";

export interface IRegisterUserState {
    user: IRegisterUserData | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

type TRegisterUserActions = 
    | TRegisterUserRequestAction
    | TRegisterSuccessAction
    | TRegisterFailureAction

const initialState: IRegisterUserState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    isError: false,
    errorMessage: '',
};

export const registerReducer = (state = initialState, action: TRegisterUserActions) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { ...state, isLoading: true, isError: false, errorMessage: '' };
        case REGISTER_SUCCESS:
            console.log(action.payload)
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