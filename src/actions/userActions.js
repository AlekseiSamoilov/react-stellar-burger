// import { request } from "../utils/request";
// import { UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./actionTypes"



// export const updateUserInfo = (userData) => async (dispatch, getState) => {
//     dispatch({ type: UPDATE_USER_REQUEST });
//     try {
//         const { auth } = getState();
//         const accessToken = auth.accessToken;

//         const res = await request('/auth/user', {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': accessToken,
//             },
//             body: JSON.stringify(userData),
//         });
//         const data = await res.json();
//         if (data.success) {
//             dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
//         } else {
//             dispatch({ type: UPDATE_USER_FAILURE, payload: data.message });
//         }
//     } catch (error) {
//         dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
//     }
// };