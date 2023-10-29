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