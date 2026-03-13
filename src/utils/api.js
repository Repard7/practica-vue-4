const API = process.env.VUE_APP_API;

export const loginRequest = (user) => {
    return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then((result) => result.data.user_token);
};

export const registerRequest = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then((result) => result.data.user_token);
};