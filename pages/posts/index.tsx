import React from 'react';
import WritingButon from '@/components/Common/WritingButton/WritingButton';
import { useRouter } from 'next/router';
import PostItem from '@/components/Post/PostItem/PostItem';
import styled from 'styled-components';

const postList = [
  {
    id: 1,
    tags: ['짜증나', '태그', '테스트'],
    firstCategory: '모르겠어요',
    secondCategory: '기쁨',
    content:
      '안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요',
    hit: 11,
    createdAt: '2022-05-04',
  },
  {
    id: 2,
    tags: ['짜증나', '태그', '테스트'],
    firstCategory: '모르겠어요',
    secondCategory: '기쁨',
    content:
      '안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요',
    hit: 11,
    createdAt: '2022-05-04',
  },
  {
    id: 3,
    tags: ['짜증나', '태그', '테스트'],
    firstCategory: '모르겠어요',
    secondCategory: '기쁨',
    content:
      '안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요',
    hit: 11,
    createdAt: '2022-05-04',
  },
  {
    id: 4,
    tags: ['짜증나', '태그', '테스트'],
    firstCategory: '모르겠어요',
    secondCategory: '기쁨',
    content:
      '안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요안녕하세요.안녕하세요',
    hit: 11,
    createdAt: '2022-05-04',
  },
];

const PostList = () => {
  const router = useRouter();
  const handleWritingButton = () => router.push('/write/pre-emotion');

  return (
    <PostListContainer>
      {postList.map((post) => (
        <li key={post.id}>
          <PostItem post={post} />
        </li>
      ))}
      <WritingButon onClick={handleWritingButton} />
    </PostListContainer>
  );
};

const PostListContainer = styled.ul`
  margin-top: 2rem;

  li ~ li {
    margin-top: 1.8rem;
  }
`;

export default PostList;
