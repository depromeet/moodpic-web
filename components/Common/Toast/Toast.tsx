import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastType } from '@/shared/type/common';
import { CustomedToastContainer } from './Toast.styles';
import { Slide } from 'react-toastify';

interface ToastProps {
  type: ToastType;
}

const Toast = ({ type }: ToastProps) => {
  return (
    <CustomedToastContainer
      type={type}
      position="top-center"
      autoClose={2000}
      hideProgressBar
      closeOnClick
      transition={Slide}
    />
  );
};

export default Toast;
