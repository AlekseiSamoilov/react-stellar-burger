import { LOGIN_SUCCESS } from "../actions/actionTypes";
import { BASE_URL } from "./constants";

function checkResponse(res) {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}

export function request(url, options) {
return fetch(`${BASE_URL}${url}`, options)
.then(checkResponse);
}

export const refreshToken = async () => {
    try {
        const res = await fetch('/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        });
        return await res.json();
    } catch (error) {
        console.error('Ошибка обновления токена', error);
        return { success: false };
    }
};

export const fetchWithRefresh = async (url, options) => {
    // console.log("Sending request to:", url, "with options:", options);
    try {
        const res = await fetch(`${BASE_URL}${url}`, options);
        return await checkResponse(res);
    } catch (err) {
        console.log("Error in initial request:", err);
        if (err.message === 'jwt expired') {
            console.log("JWT token expired, attempting to refresh");
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            console.log("Token refreshed:", refreshData);
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            // console.log(refreshToken)
            localStorage.setItem('token', refreshData.accessToken);
            options.headers.Authorization = `Bearer ${refreshData.accessToken}`;
            const res = await fetch(`${BASE_URL}${url}`, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


  