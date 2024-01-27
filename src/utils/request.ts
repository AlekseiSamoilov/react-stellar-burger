
import { TIngredient } from "../services/types";
import { BASE_URL } from "./constants";

interface IRefreshTokenResponse {
    token: string;
    expireIn: string;
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export type TServerResponse<T> = {
    success: boolean;
} & T;


const checkResponse = <T>(res: Response): Promise<T> => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}

export async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${url}`, options);
    return checkResponse<T>(res);
}

export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
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
        throw new Error('Не удалось обновить токен');
    }
};


export const fetchWithRefresh = async <T>(url: string, options:RequestInit): Promise<TServerResponse<T>> => {
    try {
        const res = await fetch(`${BASE_URL}${url}`, options);
        return await checkResponse(res);
    } catch (err: any) {
        console.log("Ошибка запроса:", err);
        if (err.message === 'jwt expired') {
            console.log("Токен Истек, ща может быть обновим");
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            console.log("Token refreshed:", refreshData);
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('token', refreshData.accessToken);

            const headers = new Headers(options.headers);
            headers.set('Authorization', `Bearer ${refreshData.accessToken}`);
            const updatedOptions = { ...options, headers };
            const res = await fetch(`${BASE_URL}${url}`, updatedOptions);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


  