import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { progressStepStateAtom } from '@/store/toast/atom';
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

const questionList = [
  '왜 그렇게 생각했나요?',
  '두번째 질문 영역',
  '세번째 질문 영역',
];

const HEADER_HEIGHT = 50;

const Question = () => {
  const setNextProgressStep = useSetRecoilState(progressStepStateAtom);
  const [mode, setMode] = useState('providedQuestion');
  const firstTextAreaRef = useRef<HTMLDivElement>(null);
  const secondTextAreaRef = useRef<HTMLDivElement>(null);
  const thirdTextAreaRef = useRef<HTMLDivElement>(null);

  const nextProgressStep = () => {
    setNextProgressStep((prev) => prev + 1);
  };

  const onChangeMode = (target: string) => () => {
    if (target === 'providedQuestion') setMode('providedQuestion');
    if (target === 'myselfQuestion') setMode('myselfQuestion');
  };

  // 내일 여기부터 타입잡고 시작
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollToTextAreaOffestTop = (target: any) => () => {
    const targetRef = target;
    if (typeof window !== undefined) {
      window.scrollTo({
        top: (targetRef.current as HTMLDivElement).offsetTop - HEADER_HEIGHT,
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
            color="primary"
            size="medium"
            onClick={onChangeMode('providedQuestion')}
          >
            질문에 맞춰 쓸래요
          </Button>
          <Button
            color="gray"
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
            <input
              style={{ width: '100%', height: 326 }}
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
            <input
              style={{ width: '100%', height: 326 }}
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
            <input
              style={{ width: '100%', height: 326 }}
              onFocus={scrollToTextAreaOffestTop(thirdTextAreaRef)}
            />
          </ProvidedQuestionWrap>
        </>
      ) : (
        <>
          <MyselfQuestionTitle>
            ✏️ &nbsp; 감정과 생각을 자유롭게 적어주세요.
          </MyselfQuestionTitle>
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
