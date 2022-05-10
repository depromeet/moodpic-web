import React from 'react';
import styled from 'styled-components';
import { ButtonWrapper } from '@/pages/write';
import Button from '@/components/Common/Button/Button';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import theme from '@/styles/theme';
import SelectButton from '../Common/SelectButton/SelectButton';

// const emotionList = [
//   '후회해요',
//   '슬퍼요',
//   '실망했어요',
//   '무기력해요',
//   '불안해요',
//   '짜증나요',
//   '모르겠어요',
// ];

const firstCategoryList = [
  { a1: '후회해요' },
  { a2: '슬퍼요' },
  { a3: '실망했어요' },
  { a4: '무기력해요' },
  { a5: '불안해요' },
  { a6: '짜증나요' },
  { a7: '모르겠어요' },
];

const PreEmotion = () => {
  const nextProgressStep = useNextProgressStep();
  return (
    <>
      <MainTitle>
        홍길동님의 <br />
        지금 감정은 어떠세요?
      </MainTitle>
      <SelectButton
        emotionList={firstCategoryList.map((v) => Object.values(v)).flat()}
      />
      <ButtonWrapper>
        <Button color="gray" onClick={nextProgressStep} size="large">
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default PreEmotion;

export const MainTitle = styled.div`
  ${theme.fonts.subtitle1}
  font-weight: 500;
  margin: 54px 0 40px;
  color: ${theme.colors.white};
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  column-gap: 12px;
  row-gap: 12px;
`;
