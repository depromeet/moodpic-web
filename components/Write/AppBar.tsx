import { progressStepStateAtom } from '@/store/progressStep/atom';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { CommonAppBar, CommonIconButton } from '../Common';

const AppBar = () => {
  const router = useRouter();
  const progressStep = useRecoilValue(progressStepStateAtom);
  const setPrevProgressStep = useSetRecoilState(progressStepStateAtom);

  const onClickGoBack = useCallback(() => {
    if (progressStep === 1) {
      router.back();
      return;
    }
    setPrevProgressStep((prev) => prev - 1);
  }, [progressStep, router, setPrevProgressStep]);

  const renderAppBar = useMemo(() => {
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
  }, [onClickGoBack, progressStep, router]);

  return renderAppBar;
};

export default AppBar;

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
