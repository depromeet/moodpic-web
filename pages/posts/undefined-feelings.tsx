import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { Post } from '@/shared/type/post';
import PostItem from '@/components/Post/PostItem/PostItem';
import { CommonAppBar, CommonIconButton } from '@/components/Common';

const postList: Post[] = [];

const PostList = () => {
  const router = useRouter();

  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" onClick={() => router.back()} />
        </CommonAppBar.Left>
      </CommonAppBar>
      <PostListContainer>
        <Title>
          몰라요를 선택한 기록들, <br />
          지금은 어떤 감정이 드세요?
        </Title>
        {postList.length ? (
          postList.map((post) => (
            <li key={post.id}>
              <PostItem post={post} isMine={false} onClick={() => router.push(`/posts/${post.id}`)} />
            </li>
          ))
        ) : (
          <GuideMessage>기록이 없어요.</GuideMessage>
        )}
      </PostListContainer>
    </>
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
