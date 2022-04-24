import React from 'react';
import { toast } from 'react-toastify';
import Toast from '@/components/Common/Toast/Toast';

const ToastExample = () => {
  const notify = () => toast('이미 존재하는 폴더명이에요.');

  return (
    <div>
      <button onClick={notify} style={{ backgroundColor: 'yellow' }}>
        이미 존재하는 폴더명이에요.
      </button>
      <Toast showType="error" />
    </div>
  );
};

export default ToastExample;
