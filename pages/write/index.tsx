import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { progressStepStateAtom } from '@/store/toast/atom';
import { CommonProgress } from '@/components/Common';
import PreEmotion from '@/components/PreEmotion/PreEmotion';
import Question from '@/components/Question/Question';
import CurrentEmotion from '@/components/CurrentEmotion/CurrentEmotion';
import Complete from '@/components/Complete/Complete';

const Write = () => {
  const progressStep = useRecoilValue(progressStepStateAtom);
  return (
    <>
      <CommonProgress step={progressStep} />
      {progressStep === 1 && <PreEmotion />}
      {progressStep === 2 && <Question />}
      {progressStep === 3 && <CurrentEmotion />}
      {progressStep === 4 && <Complete />}
    </>
  );
};

export default Write;

export const ButtonWrapper = styled.div`
  margin: auto 0 80px;
`;
