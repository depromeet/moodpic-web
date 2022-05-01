import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { progressStepStateAtom } from '@/store/toast/atom';
import { Progress } from '@/components/Common';
import PreEmotion from '@/components/PreEmotion/PreEmotion';
import Question from '@/components/Question/Question';
import CurrentEmotion from '@/components/CurrentEmotion/CurrentEmotion';
import Complete from '@/components/Complete/Complete';

const Write = () => {
  const progressStep = useRecoilValue(progressStepStateAtom);
  return (
    <>
      <Progress step={progressStep} />
      {progressStep === 1 && <PreEmotion />}
      {progressStep === 2 && <Question />}
      {progressStep === 3 && <CurrentEmotion />}
      {progressStep === 4 && <Complete />}
    </>
  );
};

export default Write;

export const ButtonWrapper = styled.div`
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto 0 80px;
  z-index: 1;
`;
