import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  CommonAppBar,
  CommonIconButton,
  CommonTagButton,
} from '@/components/Common';
import Card from '@/components/Card/Card';
import theme from '@/styles/theme';
import { EMOTION_COLOR_TYPE } from '@/shared/constants/emotion';
import { CONTENT_SEPARATOR } from '@/shared/constants/question';
import {
  NumberTitle,
  ProvidedQuestionMainTitle,
  ProvidedQuestionWrap,
} from '@/components/Question/Question.styles';
import { CommonTextArea } from '@/components/Common';

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  const post = {
    id: 3,
    tags: ['우울해', '대박피곤해', '이거모야', '이거모야', '이거모야'],
    firstCategory: 'SADNESS',
    secondCategory: 'DONTKNOW',
    content:
      '카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나|안녕하세요|안녕하세요',
    hit: 3333,
    createdAt: '2021년 02월 04일 16:45',
  };

  const hasMultipleContent = post.content.includes(CONTENT_SEPARATOR);
  const contents = post.content.split(CONTENT_SEPARATOR);

  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left"></CommonIconButton>
        </CommonAppBar.Left>
        <CommonAppBar.Right>
          <CommonIconButton iconName="share"></CommonIconButton>
          <CommonIconButton iconName="more"></CommonIconButton>
        </CommonAppBar.Right>
      </CommonAppBar>
      <PostDetailContainer>
        <TagContainer>
          {post.tags.map((tag, index) => (
            <CommonTagButton key={index}>#{tag}</CommonTagButton>
          ))}
        </TagContainer>
        <CardContainer>
          <Card
            firstColor={EMOTION_COLOR_TYPE[post.firstCategory]}
            secondColor={EMOTION_COLOR_TYPE[post.secondCategory]}
          >
            그땐 {post.firstCategory}, 지금은 {post.secondCategory}
          </Card>
        </CardContainer>
        {hasMultipleContent ? (
          <QuestionContainer>
            <ProvidedQuestionWrap>
              <NumberTitle>
                <span>1</span>
                /3
              </NumberTitle>
              <MultipleLineText>
                카톡이름님에게 <br /> 어떤 일이 있었나요?
              </MultipleLineText>
              <CommonTextArea value={contents[0]} height="32.6rem" readOnly />
            </ProvidedQuestionWrap>
            <ProvidedQuestionWrap>
              <NumberTitle>
                <span>2</span>
                /3
              </NumberTitle>
              <ProvidedQuestionMainTitle>
                그 때 어떤 감정이 들었나요?
              </ProvidedQuestionMainTitle>
              <CommonTextArea value={contents[1]} height="32.6rem" readOnly />
            </ProvidedQuestionWrap>
            <ProvidedQuestionWrap>
              <NumberTitle>
                <span>3</span>
                /3
              </NumberTitle>
              <ProvidedQuestionMainTitle>
                고생했어요! 스스로에게 한마디를 쓴다면?
              </ProvidedQuestionMainTitle>
              <CommonTextArea value={contents[2]} height="32.6rem" readOnly />
            </ProvidedQuestionWrap>
          </QuestionContainer>
        ) : (
          <CommonTextArea value={post.content} height="32.6rem" readOnly />
        )}
        <Description>조회수 {post.hit}</Description>
        <Description>{post.createdAt}</Description>
      </PostDetailContainer>
    </>
  );
};

const PostDetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 8rem;
`;

const TagContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 1.8rem;
  margin: 2rem -1.8rem 2.4rem;

  div {
    flex: 1 0 auto;
  }

  div ~ div {
    margin-left: 1.2rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Description = styled.p`
  ${theme.fonts.caption1};
  color: ${theme.colors.gray4};
  margin-left: auto;

  div ~ & {
    margin-top: 1.4rem;
  }

  & ~ & {
    margin-top: 1rem;
  }
`;

const CardContainer = styled.div`
  margin-bottom: 2.4rem;
`;

const MultipleLineText = styled(ProvidedQuestionMainTitle)`
  line-height: 160%;
`;

const QuestionContainer = styled.div`
  margin-bottom: -2.6rem;
`;

export default PostDetail;
