/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import useDialog from '@/hooks/useDialog';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import { createPostRequestState } from '@/store/post/atom';
import DialogCancel from '@/components/Dialog/DialogCancel';
import { CommonTextArea, CommonDialog, CommonButton } from '../Common';
import {
  ButtonContainer,
  MyselfQuestionTitle,
  NumberTitle,
  ProvidedQuestionMainTitle,
  ProvidedQuestionSubDescription,
  QuestionWrap,
} from './Question.styles';
import useInput from '@/hooks/useInput';
import { questionModeState, QuestionModeStateType } from '@/store/questionMode/atom';
import { useMemberQuery } from '@/hooks/apis';

const HEADER_HEIGHT = 50;

const Question = () => {
  const [questionModeData, setQuestionModeData] = useRecoilState(questionModeState);
  const [postRequestData, setPostRequestData] = useRecoilState(createPostRequestState);
  const [firstQuestionValue, onChangeFirstQuestionValue, setFirstQuestionValue] = useInput('');
  const [secondQuestionValue, onChangeSecondQuestionValue, setSecondQuestionValue] = useInput('');
  const [thirdQuestionValue, onChangeThirdQuestionValue, setThirdQuestionValue] = useInput('');
  const [myselfQuestionValue, onChangeMyselfQuestionValue, setMyselfQuestionValue] = useInput('');
  const [mode, setMode] = useState(questionModeData);
  const firstQuestionRef = useRef<HTMLDivElement>(null);
  const secondQuestionRef = useRef<HTMLDivElement>(null);
  const thirdQuestionRef = useRef<HTMLDivElement>(null);
  const timer = useRef<any>(null);
  const nextProgressStep = useNextProgressStep();
  const { dialogVisible, toggleDialog } = useDialog();
  const { data: me } = useMemberQuery();

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
    if (typeof window !== undefined) {
      timer.current = setTimeout(() => {
        if (targetRef.current)
          window.scrollTo({
            top: targetRef.current?.offsetTop - HEADER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
      }, 100);
    }
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

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <ButtonContainer>
        <div>
          <CommonButton
            color={mode === 'providedQuestion' ? 'primary' : 'gray'}
            size="medium"
            onClick={onClickTabButton('myselfQuestion')}
          >
            질문에 맞춰 쓸래요
          </CommonButton>
          <CommonButton
            color={mode === 'providedQuestion' ? 'gray' : 'primary'}
            size="medium"
            onClick={onClickTabButton('providedQuestion')}
          >
            내맘대로 쓸래요
          </CommonButton>
        </div>
      </ButtonContainer>
      {mode === 'providedQuestion' ? (
        <>
          <QuestionWrap ref={firstQuestionRef}>
            <NumberTitle>
              <span className="highlight">1</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>
              {me?.nickname}님, <br />
              어떤 일이 있었나요?
            </ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>
              상황을 객관적으로 파악해보는 시간을 가져보세요.
            </ProvidedQuestionSubDescription>
            <CommonTextArea
              value={firstQuestionValue}
              height="32.6rem"
              onChange={onChangeFirstQuestionValue}
              onFocus={scrollToTextAreaOffestTop(firstQuestionRef)}
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
            />
          </QuestionWrap>
          <QuestionWrap ref={secondQuestionRef}>
            <NumberTitle>
              <span className="highlight">2</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>그 때 어떤 감정이 들었나요?</ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>너무 깊게 생각하지 않아도 돼요!</ProvidedQuestionSubDescription>
            <CommonTextArea
              value={secondQuestionValue}
              height="32.6rem"
              onChange={onChangeSecondQuestionValue}
              onFocus={scrollToTextAreaOffestTop(secondQuestionRef)}
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
            />
          </QuestionWrap>
          <QuestionWrap ref={thirdQuestionRef}>
            <NumberTitle>
              <span className="highlight">3</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>고생했어요! 스스로에게 한마디를 쓴다면?</ProvidedQuestionMainTitle>
            <ProvidedQuestionSubDescription>
              지금의 나에게 해줄 수 있는 말은 무엇이 있을까요?
            </ProvidedQuestionSubDescription>
            <CommonTextArea
              value={thirdQuestionValue}
              height="32.6rem"
              onChange={onChangeThirdQuestionValue}
              onFocus={scrollToTextAreaOffestTop(thirdQuestionRef)}
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
            />
          </QuestionWrap>
        </>
      ) : (
        <QuestionWrap>
          <MyselfQuestionTitle>✏️ &nbsp; 감정과 생각을 자유롭게 적어주세요.</MyselfQuestionTitle>
          <CommonTextArea
            value={myselfQuestionValue}
            height="32.6rem"
            onChange={onChangeMyselfQuestionValue}
            placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
          />
        </QuestionWrap>
      )}
      <ButtonWrapper>
        <CommonButton
          disabled={!(!!firstQuestionValue && !!secondQuestionValue && !!thirdQuestionValue) && !myselfQuestionValue}
          color="primary"
          onClick={onClickNextButton}
          size="large"
        >
          다음
        </CommonButton>
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

const ButtonWrapper = styled.div`
  margin-top: auto;
`;
