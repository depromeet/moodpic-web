import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import useDialog from '@/hooks/useDialog';
import { progressStepStateAtom } from '@/store/progressStep/atom';
import { CommonDialog } from '@/components/Common';
import PreEmotion from '@/components/PreEmotion/PreEmotion';
import CurrentEmotion from '@/components/CurrentEmotion/CurrentEmotion';
import DialogCancel from '@/components/Dialog/DialogCancel';
import useSystemDialog from '@/hooks/useSystemDialog';
import Layout from '@/components/Write/Layout';
import { writeModeStateAtom } from '@/store/writeMode/atom';
import WorryQuestion from '@/components/Question/WorryQuestion';
import DiaryQuestion from '@/components/Question/DiaryQuestion';

const Write = () => {
  const [progressStep, setPrevProgressStep] = useRecoilState(progressStepStateAtom);
  const { dialogVisible, toggleDialog } = useDialog();
  const { confirmSystemDialog, cancelSystemDialog, removeRouteChangeEvent } = useSystemDialog(toggleDialog);
  const writeMode = useRecoilValue(writeModeStateAtom);
  const onClickGoHome = () => {
    // TODO: 취소 버튼 눌렀을시 선택한 카테고리, textArea의 value 들도 초기화 시켜줘야함
    setPrevProgressStep(1);
    confirmSystemDialog();
  };

  const renderProgressStep = useMemo(() => {
    if (writeMode === 'worry') {
      switch (progressStep) {
        case 1:
          return <PreEmotion />;
        case 2:
          return <WorryQuestion />;
        case 3:
          return <CurrentEmotion removeRouteChangeEvent={removeRouteChangeEvent} />;
        default:
          break;
      }
    } else if (writeMode === 'diary') {
      switch (progressStep) {
        case 1:
          return <DiaryQuestion />;
        case 2:
          return <CurrentEmotion removeRouteChangeEvent={removeRouteChangeEvent} />;
        default:
          break;
      }
    }
  }, [progressStep, removeRouteChangeEvent, writeMode]);

  return (
    <form>
      {renderProgressStep}
      {dialogVisible ? (
        <CommonDialog type="alert" onClose={cancelSystemDialog} onConfirm={onClickGoHome}>
          <DialogCancel />
        </CommonDialog>
      ) : null}
    </form>
  );
};

export default Write;

Write.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const ButtonWrapper = styled.div`
  margin-top: auto;
`;
