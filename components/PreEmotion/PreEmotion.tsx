import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { ButtonWrapper } from '@/pages/write';
import Button from '@/components/Common/Button/Button';
import { progressStepStateAtom } from '@/store/toast/atom';
import theme from '@/styles/theme';

const emotionList = [
  '짜증',
  '실망',
  '슬픔',
  '불안',
  '무기력',
  '후회',
  '모르겠어요',
];

const PreEmotion = () => {
  const setNextProgressStep = useSetRecoilState(progressStepStateAtom);
  const nextProgressStep = () => {
    setNextProgressStep((prev) => prev + 1);
  };
  return (
    <>
      <MainTitle>
        홍길동님의 <br />
        지금 감정은 어떠세요?
      </MainTitle>
      <ButtonContainer>
        {emotionList.map((emotion) => (
          <Button
            color="gray"
            size="medium"
            onClick={() => {
              console.log('asd');
            }}
            key={emotion}
          >
            {emotion}
          </Button>
        ))}
      </ButtonContainer>
      <ButtonWrapper>
        <Button color="gray" onClick={nextProgressStep} size="large">
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default PreEmotion;

const MainTitle = styled.div`
  ${theme.fonts.subtitle1}
  font-weight: 500;
  margin-top: 54px;
  color: ${theme.colors.white};
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  column-gap: 12px;
  row-gap: 12px;
`;
