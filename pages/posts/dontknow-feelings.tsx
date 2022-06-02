import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { Post } from '@/shared/type/post';
import PostItem from '@/components/Post/PostItem/PostItem';
import { CommonAppBar, CommonIconButton } from '@/components/Common';
import ListEmpty from 'public/images/list-empty.png';

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
          모르겠어요를 선택한 기록들, <br />
          지금은 어떤 감정이 드세요?
        </Title>
        {postList.length ? (
          postList.map((post) => (
            <li key={post.id}>
              <PostItem post={post} isMine={false} onClick={() => router.push(`/posts/${post.id}`)} />
            </li>
          ))
        ) : (
          <EmptyContainer>
            <ImageContainer>
              <Image src={ListEmpty} alt="기록이 없어요." />
            </ImageContainer>
            <GuideMessage>기록이 없어요.</GuideMessage>
          </EmptyContainer>
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

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 7.7rem;
  height: 8.3rem;
  margin: 12.6rem 0 0 0.4rem;
`;

const GuideMessage = styled.p`
  ${theme.fonts.h4};
  margin-top: 1.8rem;
  opacity: 0.7;
  color: ${theme.colors.gray4};
`;

export default PostList;
