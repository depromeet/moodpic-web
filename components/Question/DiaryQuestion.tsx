import React from 'react';
import styled from 'styled-components';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import { CommonButton } from '@/components/Common';
import { MyselfQuestionTitle, QuestionWrap } from './Question.styles';
import { useFormContext, useWatch } from 'react-hook-form';
import { WriteFormValues } from '@/shared/type/post';
import RHFTextArea from '../Common/TextArea/RHFTextArea';

const DiaryQuestion = () => {
  const nextProgressStep = useNextProgressStep();
  const { control } = useFormContext<WriteFormValues>();

  const content = useWatch({
    control,
    name: 'content',
  });

  return (
    <>
      <QuestionWrap>
        <MyselfQuestionTitle>✏️ &nbsp; 감정과 생각을 자유롭게 적어주세요.</MyselfQuestionTitle>
        <RHFTextArea<WriteFormValues>
          name="content"
          height="32.6rem"
          placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
        />
      </QuestionWrap>

      <ButtonWrapper>
        <CommonButton disabled={!content} color="primary" onClick={nextProgressStep} size="large">
          다음
        </CommonButton>
      </ButtonWrapper>
    </>
  );
};

export default DiaryQuestion;

const ButtonWrapper = styled.div`
  margin-top: auto;
`;
