// import { UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../actions/actionTypes";


// const initialState = {
//     user: null,
//     isLoading: false,
//     error: null,
// };

// export const userReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case UPDATE_USER_REQUEST:
//             console.log('UserReducer calling:', action.payload)
//             return { ...state, isLoading: true, error: null };
//         case UPDATE_USER_SUCCESS:
//             console.log('UserReducer calling:', action.payload)
//             return { ...state, isLoading: false, user: action.payload };
//         case UPDATE_USER_FAILURE:
//             return { ...state, isLoading: false, error: action.payload };
//         default: 
//         return state;
//     }
// };