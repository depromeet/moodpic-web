import React from 'react';
import styled from 'styled-components';
import { ButtonWrapper } from '@/pages/write';
import Button from '@/components/Common/Button/Button';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import theme from '@/styles/theme';
import FirstCategorySelect from '../Common/SelectButton/FirstCategorySelect';
import { postResponseState } from '@/store/postResponse/atom';
import { useRecoilValue } from 'recoil';

const PreEmotion = () => {
  const nextProgressStep = useNextProgressStep();
  const selectedState = useRecoilValue(postResponseState);

  return (
    <>
      <MainTitle>
        홍길동님의 <br />
        지금 감정은 어떠세요?
      </MainTitle>
      <FirstCategorySelect />
      <ButtonWrapper>
        <Button
          color="primary"
          onClick={nextProgressStep}
          size="large"
          disabled={selectedState.firstCategory === ''}
        >
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
