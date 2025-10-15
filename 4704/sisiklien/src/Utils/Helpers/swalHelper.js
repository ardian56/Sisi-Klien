import Swal from 'sweetalert2';

export const confirmDialog = async ({ title, text, confirmButtonText = 'Ya', cancelButtonText = 'Batal', icon = 'warning' }) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  });
};

export const alertDialog = async ({ title, text, icon = 'info', timer = 2000 }) => {
  return Swal.fire({
    title,
    text,
    icon,
    timer,
    showConfirmButton: false,
  });
};
