/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { RefObject, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import { createPostRequestState } from '@/store/post/atom';
import { CommonTextArea, CommonButton } from '@/components/Common';
import {
  NumberTitle,
  ProvidedQuestionMainTitle,
  ProvidedQuestionSubDescription,
  QuestionWrap,
} from './Question.styles';
import useInput from '@/hooks/useInput';
import { useMemberQuery } from '@/hooks/apis';

const HEADER_HEIGHT = 50;

const WorryQuestion = () => {
  const [postRequestData, setPostRequestData] = useRecoilState(createPostRequestState);
  const [firstQuestionValue, onChangeFirstQuestionValue, setFirstQuestionValue] = useInput('');
  const [secondQuestionValue, onChangeSecondQuestionValue, setSecondQuestionValue] = useInput('');
  const [thirdQuestionValue, onChangeThirdQuestionValue, setThirdQuestionValue] = useInput('');
  const firstQuestionRef = useRef<HTMLDivElement>(null);
  const secondQuestionRef = useRef<HTMLDivElement>(null);
  const thirdQuestionRef = useRef<HTMLDivElement>(null);
  const timer = useRef<any>(null);
  const nextProgressStep = useNextProgressStep();
  const { data: me } = useMemberQuery();

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
    setPostRequestData((prev) => ({
      ...prev,
      content: `${firstQuestionValue}|${secondQuestionValue}|${thirdQuestionValue}`,
    }));
    nextProgressStep();
  };

  useEffect(() => {
    const [postRequestFirstQuestionValue, postRequestSecondQuestionValue, postRequestThirdQuestionValue] =
      postRequestData.content.split('|');
    setFirstQuestionValue(postRequestFirstQuestionValue);
    setSecondQuestionValue(postRequestSecondQuestionValue);
    setThirdQuestionValue(postRequestThirdQuestionValue);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
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
        <ProvidedQuestionSubDescription>상황을 객관적으로 파악해보는 시간을 가져보세요.</ProvidedQuestionSubDescription>
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

      <ButtonWrapper>
        <CommonButton
          disabled={!(!!firstQuestionValue && !!secondQuestionValue && !!thirdQuestionValue)}
          color="primary"
          onClick={onClickNextButton}
          size="large"
        >
          다음
        </CommonButton>
      </ButtonWrapper>
    </>
  );
};

export default WorryQuestion;

const ButtonWrapper = styled.div`
  margin-top: auto;
`;
