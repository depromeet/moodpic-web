import React, { useState } from 'react';
import WritingButon from '@/components/Common/WritingButton/WritingButton';
import { useRouter } from 'next/router';
import useBottomSheet from '@/hooks/useBottomSheet';
import PostItem from '@/components/Post/PostItem/PostItem';
import {
  CommonAppBar,
  CommonBottomSheetContainer,
  CommonIconButton,
} from '@/components/Common';
import styled from 'styled-components';
import BottomSheetList from '@/components/BottomSheetList/BottomSheetList';

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
  const goToWritePage = () => router.push('/write');
  const [isEditing, setIsEditing] = useState(false);

  const { calcBottomSheetHeight, toggleSheet, isVisibleSheet } =
    useBottomSheet();

  const bottomSheetItems = [
    {
      label: '기록 선택하기',
      onClick: () => setIsEditing(true),
    },
    {
      label: '폴더명 변경하기',
      onClick: () => console.log('edit'),
    },
    {
      label: '폴더 삭제하기',
      onClick: () => console.log('delete'),
    },
  ];

  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" />
        </CommonAppBar.Left>
        <CommonAppBar.Right>
          <CommonIconButton iconName="share" alt="공유" />
          <CommonIconButton
            iconName="more"
            alt="더보기"
            onClick={() => toggleSheet()}
          />
        </CommonAppBar.Right>
      </CommonAppBar>
      <PostListContainer>
        {postList.map((post) => (
          <li key={post.id}>
            <PostItem {...{ post, isEditing }} />
          </li>
        ))}
        <WritingButon onClick={goToWritePage} />
      </PostListContainer>
      {isVisibleSheet && (
        <CommonBottomSheetContainer
          onClose={() => toggleSheet()}
          BottomSheetHeight={calcBottomSheetHeight(bottomSheetItems.length)}
        >
          <BottomSheetList items={bottomSheetItems} />
        </CommonBottomSheetContainer>
      )}
    </>
  );
};

const PostListContainer = styled.ul`
  margin-top: 2rem;

  li ~ li {
    margin-top: 1.8rem;
  }
`;

export default PostList;
