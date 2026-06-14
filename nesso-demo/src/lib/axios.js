import axios from 'axios';

let loadingManager = null;

export const setLoadingManager = (manager) => {
  loadingManager = manager;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  if (loadingManager) loadingManager.startRequest();
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (loadingManager) loadingManager.endRequest();
    return response;
  },
  (error) => {
    if (loadingManager) loadingManager.endRequest();
    return Promise.reject(error);
  }
);

export default api;