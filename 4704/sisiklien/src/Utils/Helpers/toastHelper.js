import { toast } from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, { position: 'top-right', duration: 2000 });
};

export const showError = (message) => {
  toast.error(message, { position: 'top-right', duration: 2000 });
};

export const showInfo = (message) => {
  toast(message, { position: 'top-right', duration: 2000 });
};
