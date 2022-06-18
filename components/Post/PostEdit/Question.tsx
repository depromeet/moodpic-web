import React, { ChangeEvent } from 'react';
import { DEFAULT_NICKNAME } from '@/shared/constants/common';
import { CommonTextArea } from '@/components/Common';
import { NumberTitle, ProvidedQuestionMainTitle, QuestionWrap } from '@/components/Question/Question.styles';
import { MultipleLineText, QuestionContainer } from '@/components/Post/PostDetail.style';

interface QuestionProps {
  nickname?: string;
  disabled?: boolean;
  hasMultipleContent: boolean;
  firstContent: string;
  secondContent: string;
  thirdContent: string;
  onChangeFirstContent?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onChangeSecondContent?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onChangeThirdContent?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const Question = ({
  nickname = '',
  disabled = false,
  hasMultipleContent,
  firstContent,
  secondContent,
  thirdContent,
  onChangeFirstContent,
  onChangeSecondContent,
  onChangeThirdContent,
}: QuestionProps) => {
  return (
    <>
      {hasMultipleContent ? (
        <QuestionContainer>
          <QuestionWrap>
            <NumberTitle>
              <span>1</span>
              /3
            </NumberTitle>
            <MultipleLineText>
              {nickname || DEFAULT_NICKNAME}님, <br />
              어떤 일이 있었나요?
            </MultipleLineText>
            <CommonTextArea
              value={firstContent}
              height="32.6rem"
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
              disabled={disabled}
              onChange={onChangeFirstContent}
            />
          </QuestionWrap>
          <QuestionWrap>
            <NumberTitle>
              <span>2</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>그 때 어떤 감정이 들었나요?</ProvidedQuestionMainTitle>
            <CommonTextArea
              value={secondContent}
              height="32.6rem"
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
              disabled={disabled}
              onChange={onChangeSecondContent}
            />
          </QuestionWrap>
          <QuestionWrap>
            <NumberTitle>
              <span>3</span>
              /3
            </NumberTitle>
            <ProvidedQuestionMainTitle>고생했어요! 스스로에게 한마디를 쓴다면?</ProvidedQuestionMainTitle>
            <CommonTextArea
              value={thirdContent}
              height="32.6rem"
              placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
              disabled={disabled}
              onChange={onChangeThirdContent}
            />
          </QuestionWrap>
        </QuestionContainer>
      ) : (
        <CommonTextArea value={firstContent} height="42.2rem" onChange={onChangeFirstContent} disabled={disabled} />
      )}
    </>
  );
};

export default Question;
