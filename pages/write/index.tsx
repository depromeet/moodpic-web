import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useDialog from '@/hooks/useDialog';
import { progressStepStateAtom } from '@/store/progressStep/atom';
import { CommonDialog } from '@/components/Common';
import PreEmotion from '@/components/PreEmotion/PreEmotion';
import Question from '@/components/Question/Question';
import CurrentEmotion from '@/components/CurrentEmotion/CurrentEmotion';
import Complete from '@/components/Complete/Complete';
import DialogCancel from '@/components/Dialog/DialogCancel';
import useSystemDialog from '@/hooks/useSystemDialog';
import Layout from '@/components/Write/Layout';

const Write = () => {
  const progressStep = useRecoilValue(progressStepStateAtom);
  const setPrevProgressStep = useSetRecoilState(progressStepStateAtom);
  const { dialogVisible, toggleDialog } = useDialog();
  const { confirmSystemDialog, cancelSystemDialog, removeRouteChangeEvent } = useSystemDialog(toggleDialog);

  const onClickGoHome = () => {
    // TODO: 취소 버튼 눌렀을시 선택한 카테고리, textArea의 value 들도 초기화 시켜줘야함
    setPrevProgressStep(1);
    confirmSystemDialog();
  };

  const renderProgressStep = () => {
    switch (progressStep) {
      case 1:
        return <PreEmotion />;
      case 2:
        return <Question />;
      case 3:
        return <CurrentEmotion removeRouteChangeEvent={removeRouteChangeEvent} />;
      case 4:
        return <Complete />;
      default:
        break;
    }
  };

  return (
    <>
      {renderProgressStep()}
      {dialogVisible ? (
        <CommonDialog type="alert" onClose={cancelSystemDialog} onConfirm={onClickGoHome}>
          <DialogCancel />
        </CommonDialog>
      ) : null}
    </>
  );
};

export default Write;

Write.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const ButtonWrapper = styled.div`
  margin-top: auto;
`;
