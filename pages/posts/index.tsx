import React, { useState } from 'react';
import WritingButon from '@/components/Common/WritingButton/WritingButton';
import { useRouter } from 'next/router';
import useBottomSheet from '@/hooks/useBottomSheet';
import PostList from '@/components/Post/PostList/PostList';
import {
  CommonAppBar,
  CommonBottomSheetContainer,
  CommonDialog,
  CommonIconButton,
} from '@/components/Common';
import styled from 'styled-components';
import BottomSheetList from '@/components/BottomSheetList/BottomSheetList';
import theme from '@/styles/theme';
import useDialog from '@/hooks/useDialog';
import DialogWarning from '@/components/Dialog/DialogWarning';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';
import useInput from '@/hooks/useInput';

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

const PostListPage = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [dialogType, setDialogType] = useState('');
  const { inputValue, onChangeInput } = useInput('');

  const { dialogVisible, toggleDialog } = useDialog();
  const { calcBottomSheetHeight, toggleSheet, isVisibleSheet } =
    useBottomSheet();

  const bottomSheetItems = [
    {
      label: '기록 선택하기',
      onClick: () => {
        setIsEditing(true);
        toggleSheet();
      },
    },
    {
      label: '폴더명 변경하기',
      onClick: () => {
        setDialogType('edit');
        toggleDialog();
        toggleSheet();
      },
    },
    {
      label: '폴더 삭제하기',
      onClick: () => {
        setDialogType('delete');
        toggleDialog();
        toggleSheet();
      },
    },
  ];

  const goToWritePage = () => router.push('/write');

  const onDelete = () => {
    console.log('폴더 삭제');
  };

  const handleSubmit = () => {
    // TODO: post 삭제 API 연동 예정
    console.log(checkedItems, '기록 삭제하기');
  };

  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton
            iconName="left"
            alt="이전"
            onClick={() => router.back()}
          />
          <HeaderTitle>폴더명</HeaderTitle>
        </CommonAppBar.Left>
        <CommonAppBar.Right>
          {isEditing ? (
            <TextButton onClick={handleSubmit}>완료</TextButton>
          ) : (
            <CommonIconButton
              iconName="more"
              alt="더보기"
              onClick={() => toggleSheet()}
            />
          )}
        </CommonAppBar.Right>
      </CommonAppBar>
      <PostList
        postList={postList}
        isEditing={isEditing}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
      <WritingButon onClick={goToWritePage} />
      {isVisibleSheet && (
        <CommonBottomSheetContainer
          onClose={() => toggleSheet()}
          BottomSheetHeight={calcBottomSheetHeight(bottomSheetItems.length)}
        >
          <BottomSheetList items={bottomSheetItems} />
        </CommonBottomSheetContainer>
      )}
      {dialogVisible && (
        <CommonDialog
          type={dialogType === 'delete' ? 'alert' : 'modal'}
          onClose={toggleDialog}
          onConfirm={onDelete}
        >
          {dialogType === 'delete' ? (
            <DialogWarning>폴더를 삭제하시겠습니까?</DialogWarning>
          ) : (
            <DialogFolderForm
              value={inputValue}
              isEditMode
              onChange={onChangeInput}
            />
          )}
        </CommonDialog>
      )}
    </>
  );
};

const TextButton = styled.button`
  ${theme.fonts.h6};
  color: ${theme.colors.primary};

  &:disabled {
    color: ${theme.colors.gray3};
  }
`;

const HeaderTitle = styled.h2`
  margin-left: -0.2rem;
  ${theme.fonts.h4};
  color: ${theme.colors.white};
`;

export default PostListPage;
