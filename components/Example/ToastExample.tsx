import React from 'react';
import useToast from '@/hooks/useToast';

const ToastExample = () => {
  const notify = useToast({
    type: 'error',
    message: '이미 존재하는 폴더명이에요.',
  });

  return (
    <div>
      <button onClick={notify} style={{ backgroundColor: 'yellow' }}>
        토스트 띄우기
      </button>
    </div>
  );
};

export default ToastExample;
