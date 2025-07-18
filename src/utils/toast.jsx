import toast from 'react-hot-toast';

export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, { ...options });
  },
  error: (message, options = {}) => {
    toast.error(message, { ...options });
  },
  info: (message, options = {}) => {
    toast(message, { ...options }); // Default neutral toast
  },
  warning: (message, options = {}) => {
    toast(message, {
      icon: '⚠️',
      ...options,
    });
  },
};