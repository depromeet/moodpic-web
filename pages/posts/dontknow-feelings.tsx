import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import theme from '@/styles/theme';
import PostItem from '@/components/Post/PostItem/PostItem';
import { CommonAppBar, CommonIconButton } from '@/components/Common';
import ListEmpty from 'public/images/list-empty.png';
import { useIncompletedPostsQuery } from '@/hooks/apis';
import ImageMessage from '../../components/ImageMessage/ImageMessage';

const PostList = () => {
  const router = useRouter();
  const { data: postList = [] } = useIncompletedPostsQuery();

  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" onClick={() => router.back()} />
        </CommonAppBar.Left>
      </CommonAppBar>
      <PostListContainer>
        <Title>
          모르겠어요를 선택한 기록들, <br />
          지금은 어떤 감정이 드세요?
        </Title>
        {postList.length ? (
          postList.map((post) => (
            <PostItem key={post.id} post={post} isMine={false} onClick={() => router.push(`/posts/${post.id}`)} />
          ))
        ) : (
          <ImageMessage src={ListEmpty} alt="기록이 없어요.">
            기록이 없어요.
          </ImageMessage>
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

export default PostList;
