import axios from 'axios'
import { showToast } from './toast'
import { useAuthStore } from '../store/auth';
// Create Axios instance

const axiosInstance = axios.create({

  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    // 'Content-Type': 'application/json',
  },
  withCredentials:true
})

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const { response ,config} = error;
    const showErrorToast = config?.showErrorToast !== false;

    if (response) {
      const status = response.status;

      if (status === 401 && showErrorToast) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      const errorObject = response.data?.errors;
      if (errorObject && typeof errorObject === 'object') {
        const messages = Object.values(errorObject).flat(); // handles arrays of messages
        if (messages.length > 0) {
          showToast.error(messages[0]);
        }
      } else if (response.data?.message) {
        showToast.error(response.data.message); // fallback generic message
      }
    } else {
      showToast.error(error.message || 'Something went wrong');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance
