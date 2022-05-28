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
import { postRequestState } from '@/store/postResponse/atom';

const Write = () => {
  const router = useRouter();
  const progressStep = useRecoilValue(progressStepStateAtom);
  const setPrevProgressStep = useSetRecoilState(progressStepStateAtom);
  const { dialogVisible, toggleDialog } = useDialog();
  const resetPostRequestState = useResetRecoilState(postRequestState);
  const resetProgressStepState = useResetRecoilState(progressStepStateAtom);

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
          <CancelText onClick={toggleDialog}>취소</CancelText>
        </CommonAppBar.Right>
      </CommonAppBar>
    );
  }, [progressStep, onClickGoBack, toggleDialog]);

  const browserTabcloseHandler = useCallback((e) => {
    e.preventDefault(); // 새로고침 시, 뒤로가기 시에 브라우저단에서 물어봐줌
    e.returnValue = ''; // 크롬에서 필수라고 하네요 (왜인지 모름)
  }, []);

  /**
   * 뒤로가기 눌렀을때 나가기 전 물어보는 기능
   */
  useEffect(() => {
    if (typeof window !== undefined) {
      router.beforePopState(() => {
        const result = window.confirm('정말로 나가시겠습니까? 작성중인 기록은 삭제됩니다.');
        if (!result) {
          window.history.pushState('/write', '');
          router.push('/write');
        }
        return result;
      });
      window.onbeforeunload = browserTabcloseHandler;
    }

    return () => {
      if (typeof window !== undefined) {
        window.onbeforeunload = null;
      }
      router.beforePopState(() => {
        return true;
      });
    };
  }, [router, browserTabcloseHandler]);

  useEffect(() => {
    return () => {
      resetProgressStepState();
      resetPostRequestState();
    };
  }, [resetPostRequestState, resetProgressStepState]);

  return (
    <>
      {renderAppBar}
      <CommonProgress step={progressStep} />
      {progressStep === 1 && <PreEmotion />}
      {progressStep === 2 && <Question />}
      {progressStep === 3 && <CurrentEmotion />}
      {progressStep === 4 && <Complete />}
      {dialogVisible ? (
        <CommonDialog type="alert" onClose={toggleDialog} onConfirm={onClickGoHome}>
          <DialogCancel />
        </CommonDialog>
      ) : null}
    </>
  );
};

export default Write;

export const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  margin-top: auto;
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
