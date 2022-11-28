import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import { createPostRequestState } from '@/store/post/atom';
import { CommonTextArea, CommonButton } from '@/components/Common';
import { MyselfQuestionTitle, QuestionWrap } from './Question.styles';
import useInput from '@/hooks/useInput';

const DiaryQuestion = () => {
  const [postRequestData, setPostRequestData] = useRecoilState(createPostRequestState);
  const [myselfQuestionValue, onChangeMyselfQuestionValue, setMyselfQuestionValue] = useInput('');
  const nextProgressStep = useNextProgressStep();

  const onClickNextButton = () => {
    setPostRequestData((prev) => ({ ...prev, content: myselfQuestionValue }));
    nextProgressStep();
  };

  useEffect(() => {
    setMyselfQuestionValue(postRequestData.content);
  }, []);

  return (
    <>
      <QuestionWrap>
        <MyselfQuestionTitle>✏️ &nbsp; 감정과 생각을 자유롭게 적어주세요.</MyselfQuestionTitle>
        <CommonTextArea
          value={myselfQuestionValue}
          height="32.6rem"
          onChange={onChangeMyselfQuestionValue}
          placeholder="질문에 대한 감정과 생각을 자유롭게 적어주세요."
        />
      </QuestionWrap>

      <ButtonWrapper>
        <CommonButton disabled={!myselfQuestionValue} color="primary" onClick={onClickNextButton} size="large">
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
