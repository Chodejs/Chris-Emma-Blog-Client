import axios from 'axios';

// "import.meta.env" is how Vite accesses those .env files we made
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // Explicitly tell the browser not to cache requests
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    }
});

// Add a Request Interceptor
// This runs before EVERY request sends to attach your token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // --- THE ANTI-CACHE NUKE ---
    // If it's a GET request, attach a unique timestamp.
    // This forces the browser to treat it as a brand new request every time.
    if (config.method === 'get') {
        config.params = { ...config.params, _t: Date.now() };
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;