import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { progressStepStateAtom } from '@/store/progressStep/atom';
import { createPostRequestState } from '@/store/post/atom';
import { CommonAppBar, CommonIconButton, CommonProgress } from '../Common';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const progressStep = useRecoilValue(progressStepStateAtom);
  const setPrevProgressStep = useSetRecoilState(progressStepStateAtom);
  const resetcreatePostRequestState = useResetRecoilState(createPostRequestState);
  const resetProgressStepState = useResetRecoilState(progressStepStateAtom);

  const onClickGoBack = useCallback(() => {
    if (progressStep === 1) {
      router.back();
      return;
    }
    setPrevProgressStep((prev) => prev - 1);
  }, [progressStep, router, setPrevProgressStep]);

  const renderAppBar = () => {
    if (progressStep === 1) {
      return (
        <CommonAppBar>
          <CommonAppBar.Left>
            <CommonIconButton iconName="left" alt="이전" onClick={onClickGoBack} />
          </CommonAppBar.Left>
        </CommonAppBar>
      );
    }
    if (progressStep === 4) {
      return <EmptyAppBar />;
    }
    return (
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" onClick={onClickGoBack} />
        </CommonAppBar.Left>
        <CommonAppBar.Right>
          <CancelText onClick={() => router.back()}>취소</CancelText>
        </CommonAppBar.Right>
      </CommonAppBar>
    );
  };

  useEffect(() => {
    return () => {
      resetProgressStepState();
      resetcreatePostRequestState();
    };
  }, [resetcreatePostRequestState, resetProgressStepState]);

  return (
    <>
      {renderAppBar()}
      <CommonProgress step={progressStep} />
      {children}
    </>
  );
};

export default Layout;

const CancelText = styled.div`
  ${theme.fonts.h6}
  line-height: 1.68rem;
  color: ${theme.colors.white};
  cursor: pointer;
`;

const EmptyAppBar = styled.div`
  width: 100%;
  height: 4.6rem;
`;
