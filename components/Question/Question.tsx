import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { progressStepStateAtom } from '@/store/toast/atom';
import Button from '@/components/Common/Button/Button';
import { ButtonWrapper } from '@/pages/write';
import BgClose from 'public/svgs/bgclose.svg';
import theme from '@/styles/theme';

const questionList = [
  '왜 그렇게 생각했나요?',
  '두번째 질문 영역',
  '세번째 질문 영역',
];

const Question = () => {
  const setNextProgressStep = useSetRecoilState(progressStepStateAtom);
  const nextProgressStep = () => {
    setNextProgressStep((prev) => prev + 1);
  };
  return (
    <>
      <ButtonContainer>
        <div>
          <Button
            color="primary"
            size="medium"
            onClick={() => {
              console.log('asd');
            }}
          >
            질문에 맞춰 쓸래요
          </Button>
          <Button
            color="gray"
            size="medium"
            onClick={() => {
              console.log('asd');
            }}
          >
            내맘대로 쓸래요
          </Button>
        </div>
        <TooltipWrapper style={{ display: 'none' }}>
          <Triangle />
          <ImageWrap>
            <Image src={BgClose} alt="bgClose" width={24} height={24} />
          </ImageWrap>
          <TooltipTitle>📝 &nbsp; 이런 질문에 답하게 될거에요</TooltipTitle>
          <TooltipDescriptionWrap>
            {questionList.map((question) => (
              <TooltipDescription key={question}>{question}</TooltipDescription>
            ))}
          </TooltipDescriptionWrap>
        </TooltipWrapper>
      </ButtonContainer>
      <ButtonWrapper>
        <Button color="gray" onClick={nextProgressStep} size="large">
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default Question;

const ButtonContainer = styled.div`
  margin: 24px 0;
  & > div > button:not(:last-child) {
    margin-right: 12px;
  }
`;

const TooltipWrapper = styled.div`
  position: absolute;
  /* left: 50%;
  transform: translate(-222px, 70px); */
  left: 18px;
  top: 150px;
  display: inline-flex;
  flex-direction: column;
  max-width: 339px;
  width: 100%;
  padding: 18px;
  background-color: ${theme.colors.white};
  border-radius: 14px;
  z-index: 999;
`;

const Triangle = styled.div`
  position: absolute;
  top: -11px;
  left: 18px;
  width: 0;
  height: 0;
  border-bottom: 15px solid ${theme.colors.white};
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
`;

const ImageWrap = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const TooltipTitle = styled.div`
  ${theme.fonts.h5}
  margin-bottom: 12px;
`;

const TooltipDescriptionWrap = styled.ol`
  display: flex;
  flex-direction: column;
`;

const TooltipDescription = styled.li`
  ${theme.fonts.body}
  ${theme.colors.black}
  font-weight: 500;
  margin-left: 16px;
`;
