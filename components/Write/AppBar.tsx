import { progressStepStateAtom } from '@/store/progressStep/atom';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { CommonAppBar, CommonIconButton } from '../Common';

const AppBar = () => {
  const router = useRouter();
  const [progressStep, setPrevProgressStep] = useRecoilState(progressStepStateAtom);

  const onClickGoBack = useCallback(() => {
    if (progressStep === 1) {
      router.back();
      return;
    }
    setPrevProgressStep((prev) => prev - 1);
  }, [progressStep, router, setPrevProgressStep]);

  const renderAppBar = useMemo(
    () => (
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" onClick={onClickGoBack} />
        </CommonAppBar.Left>
      </CommonAppBar>
    ),
    [onClickGoBack],
  );

  return renderAppBar;
};

export default AppBar;
