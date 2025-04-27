import { toast } from "react-toastify";

import { ToastOptions } from "../Types/Toast";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const useToast = () => {
  const showSuccess = (message: string, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
  };

  const showError = (message: string, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
  };

  return { showSuccess, showError };
};
