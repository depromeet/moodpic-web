import React, { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import useDialog from '@/hooks/useDialog';
import { progressStepStateAtom } from '@/store/progressStep/atom';
import { CommonAppBar, CommonDialog, CommonIconButton, CommonProgress } from '@/components/Common';
import PreEmotion from '@/components/PreEmotion/PreEmotion';
import Question from '@/components/Question/Question';
import CurrentEmotion from '@/components/CurrentEmotion/CurrentEmotion';
import Complete from '@/components/Complete/Complete';
import theme from '@/styles/theme';
import DialogCancel from '@/components/Dialog/DialogCancel';
import { createPostRequestState } from '@/store/post/atom';
import useSystemDialog from '@/hooks/useSystemDialog';

const Write = () => {
  const router = useRouter();
  const progressStep = useRecoilValue(progressStepStateAtom);
  const setPrevProgressStep = useSetRecoilState(progressStepStateAtom);
  const { dialogVisible, toggleDialog } = useDialog();
  const resetcreatePostRequestState = useResetRecoilState(createPostRequestState);
  const resetProgressStepState = useResetRecoilState(progressStepStateAtom);
  const { confirmSystemDialog, cancelSystemDialog, removeRouteChangeEvent } = useSystemDialog(toggleDialog);

  const onClickGoBack = useCallback(() => {
    if (progressStep === 1) {
      router.back();
      return;
    }
    setPrevProgressStep((prev) => prev - 1);
  }, [progressStep, router, setPrevProgressStep]);

  const onClickGoHome = () => {
    // TODO: 취소 버튼 눌렀을시 선택한 카테고리, textArea의 value 들도 초기화 시켜줘야함
    setPrevProgressStep(1);
    confirmSystemDialog();
  };

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
  }, [progressStep, onClickGoBack, toggleDialog]);

  useEffect(() => {
    return () => {
      resetProgressStepState();
      resetcreatePostRequestState();
    };
  }, [resetcreatePostRequestState, resetProgressStepState]);

  return (
    <>
      {renderAppBar}
      <CommonProgress step={progressStep} />
      {progressStep === 1 && <PreEmotion />}
      {progressStep === 2 && <Question />}
      {progressStep === 3 && <CurrentEmotion removeRouteChangeEvent={removeRouteChangeEvent} />}
      {progressStep === 4 && <Complete />}
      {dialogVisible ? (
        <CommonDialog type="alert" onClose={cancelSystemDialog} onConfirm={onClickGoHome}>
          <DialogCancel />
        </CommonDialog>
      ) : null}
    </>
  );
};

export default Write;

export const ButtonWrapper = styled.div`
  margin-top: auto;
`;

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
