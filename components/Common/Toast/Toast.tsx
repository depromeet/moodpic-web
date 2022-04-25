import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { CustomedToastContainer } from './Toast.styles';

interface ToastProps {
  type: 'error' | 'warning';
}

const Toast = ({ type }: ToastProps) => {
  return (
    <CustomedToastContainer
      type={type}
      position="bottom-center"
      autoClose={5000}
      hideProgressBar
      closeOnClick
    />
  );
};

export default Toast;
