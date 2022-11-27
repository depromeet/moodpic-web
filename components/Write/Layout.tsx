import React, { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { progressStepStateAtom } from '@/store/progressStep/atom';
import { createPostRequestState } from '@/store/post/atom';
import AppBar from './AppBar';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  const resetcreatePostRequestState = useResetRecoilState(createPostRequestState);
  const resetProgressStepState = useResetRecoilState(progressStepStateAtom);

  useEffect(() => {
    return () => {
      resetProgressStepState();
      resetcreatePostRequestState();
    };
  }, [resetcreatePostRequestState, resetProgressStepState]);

  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default Layout;
