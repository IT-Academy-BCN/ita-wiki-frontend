import { API_URL, END_POINTS } from '../config.ts';

type LoginResponse = {
    success: boolean;
    redirect_url: string;
    message: string;
}

const AUTH = END_POINTS.auth;

export const login = async () => {
    const url = `${API_URL}${AUTH.login}`;
    const controller = new AbortController();

    try {
        const response: Response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Error en iniciar sessió, status: ${response.status}`);
    
        const data: LoginResponse = await response.json();

        return data.redirect_url;
    } catch (e) {
        throw e;
    }
}
