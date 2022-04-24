import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { CustomedToastContainer } from './Toast.styles';

interface ToastProps {
  showType: 'error' | 'warning';
}

const Toast = ({ showType }: ToastProps) => {
  return (
    <CustomedToastContainer
      showType={showType}
      position="bottom-center"
      autoClose={5000}
      hideProgressBar
      closeOnClick
    />
  );
};

export default Toast;
