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

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  const post = {
    id: 3,
    tags: ['우울해', '대박피곤해', '이거모야', '이거모야', '이거모야'],
    firstCategory: 'SADNESS',
    secondCategory: 'DONTKNOW',
    content: '어쩌고 저쩌고',
    hit: 3333,
    createdAt: '2021년 02월 04일 16:45',
  };

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
        <Card
          firstColor={EMOTION_COLOR_TYPE[post.firstCategory]}
          secondColor={EMOTION_COLOR_TYPE[post.secondCategory]}
        >
          그땐 {post.firstCategory}, 지금은 {post.secondCategory}
        </Card>
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

  // TODO: Textfield 추가하고 해당 selector 수정
  div ~ & {
    margin-top: 1.4rem;
  }

  & ~ & {
    margin-top: 1rem;
  }
`;

export default PostDetail;
