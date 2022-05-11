import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useDialog from '@/hooks/useDialog';
import { progressStepStateAtom } from '@/store/progressStep/atom';
import {
  CommonAppBar,
  CommonDialog,
  CommonIconButton,
  CommonProgress,
} from '@/components/Common';
import PreEmotion from '@/components/PreEmotion/PreEmotion';
import Question from '@/components/Question/Question';
import CurrentEmotion from '@/components/CurrentEmotion/CurrentEmotion';
import Complete from '@/components/Complete/Complete';
import theme from '@/styles/theme';
import DialogCancel from '@/components/Dialog/DialogCancel';

const Write = () => {
  const router = useRouter();
  const progressStep = useRecoilValue(progressStepStateAtom);
  const setPrevProgressStep = useSetRecoilState(progressStepStateAtom);
  const { dialogVisible, toggleDialog } = useDialog();

  const onClickGoBack = useCallback(() => {
    if (progressStep === 1) {
      router.push('/');
      return;
    }
    setPrevProgressStep((prev) => prev - 1);
  }, [progressStep, router, setPrevProgressStep]);

  const onClickGoHome = () => {
    // TODO: 취소 버튼 눌렀을시 선택한 카테고리, textArea의 value 들도 초기화 시켜줘야함
    toggleDialog();
    setPrevProgressStep(1);
    router.push('/');
  };

  const renderAppBar = useMemo(() => {
    if (progressStep === 1) {
      return (
        <CommonAppBar>
          <CommonAppBar.Left>
            <CommonIconButton
              iconName="left"
              alt="이전"
              onClick={onClickGoBack}
            />
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
          <CommonIconButton
            iconName="left"
            alt="이전"
            onClick={onClickGoBack}
          />
        </CommonAppBar.Left>
        <CommonAppBar.Right>
          <CancelText onClick={toggleDialog}>취소</CancelText>
        </CommonAppBar.Right>
      </CommonAppBar>
    );
  }, [progressStep, onClickGoBack, toggleDialog]);

  return (
    <>
      {renderAppBar}
      <CommonProgress step={progressStep} />
      {progressStep === 1 && <PreEmotion />}
      {progressStep === 2 && <Question />}
      {progressStep === 3 && <CurrentEmotion />}
      {progressStep === 4 && <Complete />}
      {dialogVisible ? (
        <CommonDialog
          type="alert"
          onClose={toggleDialog}
          onConfirm={onClickGoHome}
        >
          <DialogCancel />
        </CommonDialog>
      ) : null}
    </>
  );
};

export default Write;

export const ButtonWrapper = styled.div`
  margin: auto 0 80px;
`;

const CancelText = styled.div`
  ${theme.fonts.h6}
  line-height: 16.8px;
  color: ${theme.colors.white};
  cursor: pointer;
`;

const EmptyAppBar = styled.div`
  width: 100%;
  height: 46px;
`;
