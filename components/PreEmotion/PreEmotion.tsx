import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Button from '@/components/Common/Button/Button';
import { useMemberQuery } from '@/hooks/apis';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import theme from '@/styles/theme';
import FirstCategorySelect from '../Common/SelectButton/FirstCategorySelect';
import { createPostRequestState } from '@/store/post/atom';

const PreEmotion = () => {
  const nextProgressStep = useNextProgressStep();
  const { data: me } = useMemberQuery();
  const selectedState = useRecoilValue(createPostRequestState);

  return (
    <>
      <MainTitle>
        {me?.nickname}님의 <br />
        지금 감정은 어떠세요?
      </MainTitle>
      <FirstCategorySelect />
      <ButtonWrapper>
        <Button color="primary" onClick={nextProgressStep} size="large" disabled={selectedState.firstCategory === ''}>
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default PreEmotion;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 28px;
  margin-top: auto;
  &::after {
    position: absolute;
    bottom: -28px;
    left: 0;
    width: 100%;
    height: 160px;
    content: '';
    background: linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #121212 52.6%);
    z-index: -1;
  }
`;

export const MainTitle = styled.div`
  ${theme.fonts.subtitle1}
  font-weight: 500;
  margin: 5.4rem 0 4rem;
  color: ${theme.colors.white};
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  column-gap: 1.2rem;
  row-gap: 1.2rem;
`;
