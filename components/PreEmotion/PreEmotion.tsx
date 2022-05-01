import React from 'react';
import { ButtonWrapper } from '@/pages/write';
import Button from '@/components/Common/Button/Button';
import { useSetRecoilState } from 'recoil';
import { progressStepStateAtom } from '@/store/toast/atom';

const PreEmotion = () => {
  const setNextProgressStep = useSetRecoilState(progressStepStateAtom);
  const nextProgressStep = () => {
    setNextProgressStep((prev) => prev + 1);
  };
  return (
    <>
      <ButtonWrapper>
        <Button color="gray" onClick={nextProgressStep} size="large">
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default PreEmotion;
