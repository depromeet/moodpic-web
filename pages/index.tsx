/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { tooltipStateAtom } from '@/store/tooltip/atom';
import useDialog from '@/hooks/useDialog';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import { postRequestState } from '@/store/postResponse/atom';
import Button from '@/components/Common/Button/Button';
import DialogCancel from '@/components/Dialog/DialogCancel';
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
} from 'components/Question/Question.styles';
import { useTypeInput } from '@/hooks/useTypeInput';
import { questionModeState, QuestionModeStateType } from '@/store/questionMode/atom';
import TextArea from '@/components/Common/TextArea/TextArea';
import { CommonDialog } from '@/components/Common';

const questionList = ['왜 그렇게 생각했나요?', '두번째 질문 영역', '세번째 질문 영역'];

const Question = () => {
  const [questionModeData, setQuestionModeData] = useRecoilState(questionModeState);
  const [postRequestData, setPostRequestData] = useRecoilState(postRequestState);
  const isTooltipOpen = useRecoilValue(tooltipStateAtom);
  const setTooltipState = useSetRecoilState(tooltipStateAtom);
  const [firstQuestionValue, onChangeFirstQuestionValue, setFirstQuestionValue] = useTypeInput('');
  const [secondQuestionValue, onChangeSecondQuestionValue, setSecondQuestionValue] = useTypeInput('');
  const [thirdQuestionValue, onChangeThirdQuestionValue, setThirdQuestionValue] = useTypeInput('');
  const [myselfQuestionValue, onChangeMyselfQuestionValue, setMyselfQuestionValue] = useTypeInput('');
  const [mode, setMode] = useState(questionModeData);
  const firstQuestionRef = useRef<HTMLDivElement>(null);
  const secondQuestionRef = useRef<HTMLDivElement>(null);
  const thirdQuestionRef = useRef<HTMLDivElement>(null);
  const timer = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const firstTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const nextProgressStep = useNextProgressStep();
  const { dialogVisible, toggleDialog } = useDialog();

  const onChangeMode = (targetMode: string) => {
    if (targetMode === 'providedQuestion') {
      setMode('myselfQuestion');
      setFirstQuestionValue('');
      setSecondQuestionValue('');
      setThirdQuestionValue('');
    }
    if (targetMode === 'myselfQuestion') {
      setMode('providedQuestion');
      setMyselfQuestionValue('');
    }
  };

  const onClickTabButton = (targetMode: string) => () => {
    if (targetMode === 'providedQuestion') {
      if (firstQuestionValue || secondQuestionValue || thirdQuestionValue) {
        toggleDialog();
      } else {
        setMode('myselfQuestion');
      }
    }

    if (targetMode === 'myselfQuestion') {
      if (myselfQuestionValue) {
        toggleDialog();
      } else {
        setMode('providedQuestion');
      }
    }
  };

  const onClickConfirm = (mode: string) => () => {
    onChangeMode(mode);
    toggleDialog();
  };

  const scrollToTextAreaOffestTop = (target: RefObject<HTMLDivElement>) => () => {
    const targetRef = target;
    // 참고: https://stackoverflow.com/questions/15691569/javascript-issue-with-scrollto-in-chrome/15694294#15694294
    if (typeof window !== undefined && targetRef.current) {
      timer.current = setTimeout(() => {
        targetRef.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  const onCloseTooltip = () => {
    setTooltipState(false);
  };

  const onClickNextButton = () => {
    if (myselfQuestionValue) {
      setPostRequestData((prev) => ({ ...prev, content: myselfQuestionValue }));
    } else {
      setPostRequestData((prev) => ({
        ...prev,
        content: `${firstQuestionValue}|${secondQuestionValue}|${thirdQuestionValue}`,
      }));
    }
    setQuestionModeData(mode as QuestionModeStateType);
    nextProgressStep();
  };

  useEffect(() => {
    if (postRequestData.content.includes('|')) {
      const [postRequestFirstQuestionValue, postRequestSecondQuestionValue, postRequestThirdQuestionValue] =
        postRequestData.content.split('|');
      setFirstQuestionValue(postRequestFirstQuestionValue);
      setSecondQuestionValue(postRequestSecondQuestionValue);
      setThirdQuestionValue(postRequestThirdQuestionValue);
    } else {
      setMyselfQuestionValue(postRequestData.content);
    }
  }, []);

  const resizeHandler = () => {
    const height = window.visualViewport.height;
    const viewport = window.visualViewport;
    if (buttonRef.current) {
      buttonRef.current.style.bottom = `${height - viewport.height}px`;
    }
  };

  // const blurHandler = () => {
  //   if (buttonRef.current) {
  //     buttonRef.current.style.bottom = '260px';
  //     setForceUpdate(prev => !prev);
  //   }
  // };

  // const asd = () => {
  //   if (firstTextAreaRef.current) {
  //     firstTextAreaRef.current?.blur();
  //   }
  // };

  useEffect(() => {
    // window.addEventListener('scroll', asd);
    window.visualViewport.addEventListener('resize', resizeHandler);
    return () => {
      // window.removeEventListener('scroll', asd);
      window.visualViewport.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <ButtonContainer>
        <div>
          <Button
            color={mode === 'providedQuestion' ? 'primary' : 'gray'}
            size="medium"
            onClick={onClickTabButton('myselfQuestion')}
          >
            질문에 맞춰 쓸래요
          </Button>
          <Button
            color={mode === 'providedQuestion' ? 'gray' : 'primary'}
            size="medium"
            onClick={onClickTabButton('providedQuestion')}
          >
            내맘대로 쓸래요
          </Button>
        </div>
        {isTooltipOpen && (
          <TooltipWrapper>
            <Triangle />
            <ImageWrap>
              <Image src={BgClose} alt="bgClose" width={24} height={24} onClick={onCloseTooltip} />
            </ImageWrap>
            <TooltipTitle>📝 &nbsp; 이런 질문에 답하게 될거에요</TooltipTitle>
            <TooltipDescriptionWrap>
              {questionList.map((question) => (
                <TooltipDescription key={question}>{question}</TooltipDescription>
              ))}
            </TooltipDescriptionWrap>
          </TooltipWrapper>
        )}
      </ButtonContainer>
      {mode === 'providedQuestion' ? (
        <>
          <ProvidedQuestionWrap ref={firstQuestionRef}>
            <NumberTitle>
              <span className="highlight">1</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>
              가나다라마바사가나다님에게 <br />
              어떤 일이 있었나요?
            </ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>
              상황을 객관적으로 파악해보는 시간을 가져보세요.
            </ProvidedQuestionSubDescription>
            <TextArea
              ref={firstTextAreaRef}
              // onBlur={blurHandler}
              value={firstQuestionValue}
              height="32.6rem"
              onChange={onChangeFirstQuestionValue}
              onFocus={scrollToTextAreaOffestTop(firstQuestionRef)}
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
            />
          </ProvidedQuestionWrap>
          <ProvidedQuestionWrap ref={secondQuestionRef}>
            <NumberTitle>
              <span className="highlight">2</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>그 때 어떤 감정이 들었나요?</ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>너무 깊게 생각하지 않아도 돼요!</ProvidedQuestionSubDescription>
            <TextArea
              value={secondQuestionValue}
              height="32.6rem"
              onChange={onChangeSecondQuestionValue}
              onFocus={scrollToTextAreaOffestTop(secondQuestionRef)}
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
            />
          </ProvidedQuestionWrap>
          <ProvidedQuestionWrap ref={thirdQuestionRef}>
            <NumberTitle>
              <span className="highlight">3</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>고생했어요! 스스로에게 한마디를 쓴다면?</ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>
              지금의 나에게 해줄 수 있는 말은 무엇이 있을까요?
            </ProvidedQuestionSubDescription>
            <TextArea
              value={thirdQuestionValue}
              height="32.6rem"
              onChange={onChangeThirdQuestionValue}
              onFocus={scrollToTextAreaOffestTop(thirdQuestionRef)}
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
            />
          </ProvidedQuestionWrap>
        </>
      ) : (
        <>
          <MyselfQuestionTitle>✏️ &nbsp; 감정과 생각을 자유롭게 적어주세요.</MyselfQuestionTitle>
          <TextArea
            value={myselfQuestionValue}
            height="32.6rem"
            onChange={onChangeMyselfQuestionValue}
            placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
          />
        </>
      )}
      <ButtonWrapper ref={buttonRef}>
        <Button
          disabled={!(!!firstQuestionValue || !!secondQuestionValue || !!thirdQuestionValue) && !myselfQuestionValue}
          color="primary"
          onClick={onClickNextButton}
          size="large"
        >
          다음
        </Button>
      </ButtonWrapper>
      {dialogVisible ? (
        <CommonDialog type="alert" onClose={toggleDialog} onConfirm={onClickConfirm(mode)}>
          <DialogCancel />
        </CommonDialog>
      ) : null}
    </>
  );
};

export default Question;
