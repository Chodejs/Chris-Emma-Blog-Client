import axios from 'axios';

const api = axios.create({
    // CHANGE THIS to match your local path
    baseURL: 'http://localhost/chris-emma-api/api' 
});

// Add a Request Interceptor
// This runs before EVERY request sends
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;