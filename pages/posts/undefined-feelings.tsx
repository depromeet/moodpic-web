import React from 'react';
import PostItem from '@/components/Post/PostItem.tsx/PostItem';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { Post } from '@/shared/type/post';

const postList: Post[] = [];

const PostList = () => {
  return (
    <PostListContainer>
      <Title>
        몰라요를 선택한 기록들, <br />
        지금은 어떤 감정이 드세요?
      </Title>
      {postList.length ? (
        postList.map((post) => (
          <li key={post.id}>
            <PostItem post={post} isMine={false} />
          </li>
        ))
      ) : (
        <GuideMessage>기록이 없어요.</GuideMessage>
      )}
    </PostListContainer>
  );
};

const PostListContainer = styled.ul`
  margin-top: 2rem;

  li ~ li {
    margin-top: 1.8rem;
  }
`;

const Title = styled.h4`
  ${theme.fonts.subtitle1};
  color: ${theme.colors.white};
  margin-bottom: 3.2rem;
`;

const GuideMessage = styled.p`
  padding-top: 0.4rem;
  ${theme.fonts.h6};
  color: ${theme.colors.gray4};
`;

export default PostList;
