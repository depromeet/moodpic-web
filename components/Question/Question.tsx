/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  RefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tooltipStateAtom } from '@/store/tooltip/atom';
import useDialog from '@/hooks/useDialog';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import Button from '@/components/Common/Button/Button';
import DialogCancel from '@/components/Dialog/DialogCancel';
import TextArea from '../Common/TextArea/TextArea';
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
import { CommonDialog } from '../Common';

const questionList = [
  '왜 그렇게 생각했나요?',
  '두번째 질문 영역',
  '세번째 질문 영역',
];

const HEADER_HEIGHT = 50;

const Question = () => {
  const [mode, setMode] = useState('providedQuestion');
  // TODO: any 말고 current.value 타겟을 잡을수 있는? 타입을 알아내야함
  const firstTextAreaValue = useRef<any>('');
  const secondTextAreaValue = useRef<any>('');
  const thirdTextAreaValue = useRef<any>('');
  const mySeltTextAreaValue = useRef<any>('');
  const firstTextAreaRef = useRef<HTMLDivElement>(null);
  const secondTextAreaRef = useRef<HTMLDivElement>(null);
  const thirdTextAreaRef = useRef<HTMLDivElement>(null);
  const isTooltipOpen = useRecoilValue(tooltipStateAtom);
  const setTooltipState = useSetRecoilState(tooltipStateAtom);
  const nextProgressStep = useNextProgressStep();
  const { dialogVisible, toggleDialog } = useDialog();

  const onChangeMode = (targetMode: string) => {
    if (targetMode === 'providedQuestion') {
      setMode('myselfQuestion');
      firstTextAreaValue.current = '';
      secondTextAreaValue.current = '';
      thirdTextAreaValue.current = '';
    }
    if (targetMode === 'myselfQuestion') {
      setMode('providedQuestion');
      mySeltTextAreaValue.current = '';
    }
  };

  const onClickTabButton = (targetMode: string) => () => {
    if (targetMode === 'providedQuestion') {
      if (
        firstTextAreaValue.current ||
        secondTextAreaValue.current ||
        thirdTextAreaValue.current
      ) {
        toggleDialog();
      } else {
        setMode('myselfQuestion');
      }
    }

    if (targetMode === 'myselfQuestion') {
      if (mySeltTextAreaValue.current) {
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

  const scrollToTextAreaOffestTop =
    (target: RefObject<HTMLDivElement>) => () => {
      const targetRef = target;
      if (typeof window !== undefined && targetRef.current) {
        //  window.scrollTo({
        //    top: targetRef.current.offsetTop - HEADER_HEIGHT,
        //    left: 0,
        //    behavior: 'smooth',
        //  });
        targetRef.current.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    };

  const onCloseTooltip = () => {
    setTooltipState(false);
  };

  const onChangeTextAreaValue = useCallback(
    (target) => (e: ChangeEvent<HTMLTextAreaElement>) => {
      const targetRef = target;
      targetRef.current = e.target.value;
      // console.log(
      //   `${firstTextAreaValue.current}|${secondTextAreaValue.current}|${thirdTextAreaValue.current}`,
      // );
    },
    [],
  );

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
              <Image
                src={BgClose}
                alt="bgClose"
                width={24}
                height={24}
                onClick={onCloseTooltip}
              />
            </ImageWrap>
            <TooltipTitle>📝 &nbsp; 이런 질문에 답하게 될거에요</TooltipTitle>
            <TooltipDescriptionWrap>
              {questionList.map((question) => (
                <TooltipDescription key={question}>
                  {question}
                </TooltipDescription>
              ))}
            </TooltipDescriptionWrap>
          </TooltipWrapper>
        )}
      </ButtonContainer>
      {mode === 'providedQuestion' ? (
        <>
          <ProvidedQuestionWrap ref={firstTextAreaRef}>
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
              value={firstTextAreaValue.current?.value}
              height="32.6rem"
              onChange={onChangeTextAreaValue(firstTextAreaValue)}
              onFocus={scrollToTextAreaOffestTop(firstTextAreaRef)}
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
            />
          </ProvidedQuestionWrap>
          <ProvidedQuestionWrap ref={secondTextAreaRef}>
            <NumberTitle>
              <span className="highlight">2</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>
              그 때 어떤 감정이 들었나요?
            </ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>
              너무 깊게 생각하지 않아도 돼요!
            </ProvidedQuestionSubDescription>
            <TextArea
              value={secondTextAreaValue.current?.value}
              height="32.6rem"
              onChange={onChangeTextAreaValue(secondTextAreaValue)}
              onFocus={scrollToTextAreaOffestTop(secondTextAreaRef)}
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
            />
          </ProvidedQuestionWrap>
          <ProvidedQuestionWrap ref={thirdTextAreaRef}>
            <NumberTitle>
              <span className="highlight">3</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>
              고생했어요! 스스로에게 한마디를 쓴다면?
            </ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>
              지금의 나에게 해줄 수 있는 말은 무엇이 있을까요?
            </ProvidedQuestionSubDescription>
            <TextArea
              value={thirdTextAreaValue.current?.value}
              height="32.6rem"
              onChange={onChangeTextAreaValue(thirdTextAreaValue)}
              onFocus={scrollToTextAreaOffestTop(thirdTextAreaRef)}
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
            />
          </ProvidedQuestionWrap>
        </>
      ) : (
        <>
          <MyselfQuestionTitle>
            ✏️ &nbsp; 감정과 생각을 자유롭게 적어주세요.
          </MyselfQuestionTitle>
          <TextArea
            value={mySeltTextAreaValue.current?.value}
            height="32.6rem"
            onChange={onChangeTextAreaValue(mySeltTextAreaValue)}
            placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
          />
        </>
      )}
      <ButtonWrapper>
        <Button color="gray" onClick={nextProgressStep} size="large">
          다음
        </Button>
      </ButtonWrapper>
      {dialogVisible ? (
        <CommonDialog
          type="alert"
          onClose={toggleDialog}
          onConfirm={onClickConfirm(mode)}
        >
          <DialogCancel />
        </CommonDialog>
      ) : null}
    </>
  );
};

export default Question;
