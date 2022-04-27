import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Type } from '@/shared/type/global';
import { CustomedToastContainer } from './Toast.styles';

interface ToastProps {
  type: Type;
}

const Toast = ({ type }: ToastProps) => {
  return (
    <CustomedToastContainer
      type={type}
      position="bottom-center"
      autoClose={204200}
      hideProgressBar
      closeOnClick
    />
  );
};

export default Toast;
