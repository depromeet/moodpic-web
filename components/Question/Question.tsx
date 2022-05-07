import React, { RefObject, useRef, useState } from 'react';
import Image from 'next/image';
import useInput from '@/hooks/useTypeInput';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import Button from '@/components/Common/Button/Button';
import { ButtonWrapper } from '@/pages/write';
import BgClose from 'public/svgs/bgclose.svg';
import {
  ButtonContainer,
  ImageWrap,
  MyselfQuestionTitle,
  NumberTitle,
  ProvidedQuestionMainTitle,
  ProvidedQuestionSubDescription,
  ProvidedQuestionWrap,
  TooltipDescription,
  TooltipDescriptionWrap,
  TooltipTitle,
  TooltipWrapper,
  Triangle,
} from './Question.styles';
import TextArea from '../Common/TextArea/TextArea';

const questionList = [
  '왜 그렇게 생각했나요?',
  '두번째 질문 영역',
  '세번째 질문 영역',
];

const HEADER_HEIGHT = 50;

const Question = () => {
  const [mode, setMode] = useState('providedQuestion');
  const [firstTextAreaValue, onChangeFirstTextAreaValue] = useInput('');
  const [secondTextAreaValue, onChangeSecondTextAreaValue] = useInput('');
  const [thirdTextAreaValue, onChangeThirdTextAreaValue] = useInput('');
  const [mySeltTextAreaValue, onChangeMySelfTextAreaValue] = useInput('');
  const firstTextAreaRef = useRef<HTMLDivElement>(null);
  const secondTextAreaRef = useRef<HTMLDivElement>(null);
  const thirdTextAreaRef = useRef<HTMLDivElement>(null);
  const nextProgressStep = useNextProgressStep();

  const onChangeMode = (target: string) => () => {
    if (target === 'providedQuestion') setMode('providedQuestion');
    if (target === 'myselfQuestion') setMode('myselfQuestion');
  };

  const scrollToTextAreaOffestTop =
    (target: RefObject<HTMLDivElement>) => () => {
      const targetRef = target;
      if (typeof window !== undefined && targetRef.current) {
        window.scrollTo({
          top: targetRef.current.offsetTop - HEADER_HEIGHT,
          left: 0,
          behavior: 'smooth',
        });
      }
    };

  return (
    <>
      <ButtonContainer>
        <div>
          <Button
            color={mode === 'providedQuestion' ? 'primary' : 'gray'}
            size="medium"
            onClick={onChangeMode('providedQuestion')}
          >
            질문에 맞춰 쓸래요
          </Button>
          <Button
            color={mode === 'providedQuestion' ? 'gray' : 'primary'}
            size="medium"
            onClick={onChangeMode('myselfQuestion')}
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
      {mode === 'providedQuestion' ? (
        <>
          <ProvidedQuestionWrap ref={firstTextAreaRef}>
            <NumberTitle>
              <span className="highlight">1</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>
              왜 그렇게 생각했나요?
            </ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>
              너무 깊게 생각하지 않아도 돼요. (가이드)
            </ProvidedQuestionSubDescription>
            <TextArea
              value={firstTextAreaValue}
              height="32.6rem"
              onChange={onChangeFirstTextAreaValue}
              onFocus={scrollToTextAreaOffestTop(firstTextAreaRef)}
            />
          </ProvidedQuestionWrap>
          <ProvidedQuestionWrap ref={secondTextAreaRef}>
            <NumberTitle>
              <span className="highlight">2</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>
              왜 그렇게 생각했나요?
            </ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>
              너무 깊게 생각하지 않아도 돼요. (가이드)
            </ProvidedQuestionSubDescription>
            <TextArea
              value={secondTextAreaValue}
              height="32.6rem"
              onChange={onChangeSecondTextAreaValue}
              onFocus={scrollToTextAreaOffestTop(secondTextAreaRef)}
            />
          </ProvidedQuestionWrap>
          <ProvidedQuestionWrap ref={thirdTextAreaRef}>
            <NumberTitle>
              <span className="highlight">3</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>
              왜 그렇게 생각했나요?
            </ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>
              너무 깊게 생각하지 않아도 돼요. (가이드)
            </ProvidedQuestionSubDescription>
            <TextArea
              value={thirdTextAreaValue}
              height="32.6rem"
              onChange={onChangeThirdTextAreaValue}
              onFocus={scrollToTextAreaOffestTop(thirdTextAreaRef)}
            />
          </ProvidedQuestionWrap>
        </>
      ) : (
        <>
          <MyselfQuestionTitle>
            ✏️ &nbsp; 감정과 생각을 자유롭게 적어주세요.
          </MyselfQuestionTitle>
          <TextArea
            value={mySeltTextAreaValue}
            height="32.6rem"
            onChange={onChangeMySelfTextAreaValue}
          />
        </>
      )}
      <ButtonWrapper>
        <Button color="gray" onClick={nextProgressStep} size="large">
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default Question;
