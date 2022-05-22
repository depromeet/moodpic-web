import React, { useState } from 'react';
import WritingButon from '@/components/Common/WritingButton/WritingButton';
import { useRouter } from 'next/router';
import useBottomSheet from '@/hooks/useBottomSheet';
import PostList from '@/components/Post/PostList/PostList';
import { CommonAppBar, CommonBottomSheetContainer, CommonDialog, CommonIconButton } from '@/components/Common';
import styled from 'styled-components';
import BottomSheetList from '@/components/BottomSheetList/BottomSheetList';
import theme from '@/styles/theme';
import useDialog from '@/hooks/useDialog';
import DialogWarning from '@/components/Dialog/DialogWarning';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';
import useInput from '@/hooks/useInput';
import {
  useDeleteFolderMutation,
  useDeletePostMutation,
  usePostsByFolderIdQuery,
  useUpdateFolderMutation,
} from '@/hooks/apis';
import { ToastType } from '@/shared/type/common';
import useToast from '@/hooks/useToast';

const PostListPage = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [dialogType, setDialogType] = useState('');
  const { inputValue, onChangeInput } = useInput('');
  const folderId = router.query.folderId ? Number(router.query.folderId) : 0;

  const { data: postResponse } = usePostsByFolderIdQuery({ folderId });
  const updateFolderMutation = useUpdateFolderMutation();
  const deleteFolderMutation = useDeleteFolderMutation();
  const deletePostMutation = useDeletePostMutation();

  const { dialogVisible, toggleDialog } = useDialog();
  const notify = useToast();
  const { calcBottomSheetHeight, toggleSheet, isVisibleSheet } = useBottomSheet();

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
    deleteFolderMutation.mutate(folderId);
  };

  const onEdit = () => {
    updateFolderMutation.mutate({ id: folderId, folderName: inputValue });
  };

  const onDeletePosts = () => {
    deletePostMutation.mutate(checkedItems, {
      onSuccess: () => {
        notify({
          type: ToastType.CONFIRM,
          message: '기록이 삭제되었습니다.',
        });

        setIsEditing(false);
      },
    });
  };

  const handleSubmit = () => setIsEditing(false);

  if (!postResponse) return <div>404</div>;

  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" onClick={() => router.back()} />
          <HeaderTitle>{postResponse.folderName}</HeaderTitle>
        </CommonAppBar.Left>
        <CommonAppBar.Right>
          {isEditing ? (
            <TextButton onClick={handleSubmit}>완료</TextButton>
          ) : (
            <CommonIconButton iconName="more" alt="더보기" onClick={() => toggleSheet()} />
          )}
        </CommonAppBar.Right>
      </CommonAppBar>
      {postResponse?.posts?.length ? (
        <PostList
          folderId={folderId}
          postList={postResponse.posts}
          isEditing={isEditing}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      ) : (
        <GuideMessage>기록이 없어요.</GuideMessage>
      )}
      {isEditing ? (
        <BottomController>
          <BottomButton disabled={postResponse?.posts?.length === 0}>전체 삭제</BottomButton>
          <BottomButton disabled={!checkedItems.length} onClick={onDeletePosts}>
            {checkedItems.length > 0 && `${checkedItems.length}개`} 삭제
          </BottomButton>
        </BottomController>
      ) : (
        <WritingButon onClick={goToWritePage} />
      )}
      {isVisibleSheet && (
        <CommonBottomSheetContainer
          onClose={() => toggleSheet()}
          BottomSheetHeight={calcBottomSheetHeight({
            folderSize: bottomSheetItems.length,
            hasHeader: false,
          })}
        >
          <BottomSheetList items={bottomSheetItems} />
        </CommonBottomSheetContainer>
      )}
      {dialogVisible && (
        <CommonDialog
          type={dialogType === 'delete' ? 'alert' : 'modal'}
          onClose={toggleDialog}
          onConfirm={dialogType === 'delete' ? onDelete : onEdit}
        >
          {dialogType === 'delete' ? (
            <DialogWarning>폴더를 삭제하시겠습니까?</DialogWarning>
          ) : (
            <DialogFolderForm value={inputValue} isEditMode onChange={onChangeInput} />
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

const GuideMessage = styled.p`
  padding-top: 0.4rem;
  ${theme.fonts.h6};
  color: ${theme.colors.gray4};
`;

const BottomController = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.black};
  z-index: 1;
`;

const BottomButton = styled.button<{ disabled: boolean }>`
  ${theme.fonts.h6};
  padding: 1.8rem 2rem;
  color: ${theme.colors.white};

  &:disabled {
    color: ${theme.colors.gray3};
  }
`;

export default PostListPage;
