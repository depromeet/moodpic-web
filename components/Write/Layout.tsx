import React, { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { progressStepStateAtom } from '@/store/progressStep/atom';
import { createPostRequestState } from '@/store/post/atom';
import { CommonProgress } from '../Common';
import AppBar from './AppBar';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  const progressStep = useRecoilValue(progressStepStateAtom);
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
      <CommonProgress step={progressStep} />
      {children}
    </>
  );
};

export default Layout;
