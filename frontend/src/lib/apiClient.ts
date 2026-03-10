/**
 * apiClient.ts
 * Thin fetch wrapper for all backend API calls.
 * Base URL is read from NEXT_PUBLIC_API_URL env variable.
 * Automatically attaches Authorization header from localStorage.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}

function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('ypg_token');
}

async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let errorMsg = `Request failed with status ${response.status}`;
        try {
            const errData = await response.json();
            errorMsg = errData.error || errData.message || errorMsg;
        } catch { }
        throw new ApiError(errorMsg, response.status);
    }

    // Handle empty responses (e.g., 204 No Content)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

export const apiClient = {
    get: <T>(path: string) =>
        request<T>(path, { method: 'GET' }),

    post: <T>(path: string, body: unknown) =>
        request<T>(path, {
            method: 'POST',
            body: JSON.stringify(body),
        }),

    patch: <T>(path: string, body: unknown) =>
        request<T>(path, {
            method: 'PATCH',
            body: JSON.stringify(body),
        }),

    del: <T>(path: string) =>
        request<T>(path, { method: 'DELETE' }),
};
