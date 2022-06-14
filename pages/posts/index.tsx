import React, { useEffect, useState } from 'react';
import WritingButon from '@/components/Common/WritingButton/WritingButton';
import { useRouter } from 'next/router';
import useBottomSheet from '@/hooks/useBottomSheet';
import PostList from '@/components/Post/PostList/PostList';
import {
  CommonAppBar,
  CommonBottomSheetContainer,
  CommonDialog,
  CommonIconButton,
  CommonLoading,
} from '@/components/Common';
import styled from 'styled-components';
import BottomSheetList from '@/components/BottomSheetList/BottomSheetList';
import theme from '@/styles/theme';
import useDialog from '@/hooks/useDialog';
import DialogWarning from '@/components/Dialog/DialogWarning';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';
import { useTypeInput } from '@/hooks/useTypeInput';
import useToast from '@/hooks/useToast';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import {
  useDeleteFolderMutation,
  useDeletePostMutation,
  usePostsByCategoryIdQuery,
  usePostsByFolderIdQuery,
  usePostsQuery,
  useUpdateFolderMutation,
} from '@/hooks/apis';
import { ToastType } from '@/shared/type/common';

const PostListPage = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [dialogType, setDialogType] = useState('');
  const [inputValue, onChangeInput, setInputValue] = useTypeInput('');
  const folderId = Number(router.query.folderId);
  const categoryId = Number(router.query.categoryId);

  const {
    data: postsByFolderId,
    refetch: fetchPostsByFolderId,
    fetchNextPage: fetchFolderNextPage,
    hasNextPage: hasFolderNextPage,
  } = usePostsByFolderIdQuery({ folderId });
  const {
    data: postsByCategoryId,
    refetch: fetchPostsByCategoryId,
    fetchNextPage: fetchCategoryNextPage,
    hasNextPage: hasCategoryNextPage,
  } = usePostsByCategoryIdQuery({ categoryId });
  const {
    data: posts,
    refetch: fetchPosts,
    fetchNextPage: fetchPostsNextPage,
    hasNextPage: hasPostsNextPage,
  } = usePostsQuery();
  const fetchNextPage = folderId ? fetchFolderNextPage : categoryId ? fetchCategoryNextPage : fetchPostsNextPage;
  const fetch = folderId ? fetchPostsByFolderId : categoryId ? fetchPostsByCategoryId : fetchPosts;
  const hasNextPage = folderId ? hasFolderNextPage : categoryId ? hasCategoryNextPage : hasPostsNextPage;

  const updateFolderMutation = useUpdateFolderMutation();
  const deleteFolderMutation = useDeleteFolderMutation();
  const deletePostMutation = useDeletePostMutation();

  const { dialogVisible, toggleDialog } = useDialog();
  const notify = useToast();
  const { calcBottomSheetHeight, toggleSheet, isVisibleSheet } = useBottomSheet();

  const { setEntry } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && hasNextPage) fetchNextPage();
    },
  });

  useEffect(() => {
    if (router.isReady) {
      fetch();
    }
  }, [router.isReady, fetch]);

  const goToWritePage = () => router.push('/write');

  const onDelete = () => {
    deleteFolderMutation.mutate(folderId, {
      onSuccess: () => {
        notify({
          type: ToastType.CONFIRM,
          message: '폴더가 삭제되었습니다.',
        });
        toggleDialog();
        router.replace('/');
      },
    });
  };

  const onEdit = () => {
    updateFolderMutation.mutate(
      { id: folderId, folderName: inputValue },
      {
        onSuccess: () => {
          notify({
            type: ToastType.CONFIRM,
            message: '폴더이름이 변경되었습니다.',
          });
          toggleDialog();
          fetch();
        },
      },
    );
  };

  const onDeletePosts = () => {
    deletePostMutation.mutate(checkedItems, {
      onSuccess: () => {
        notify({
          type: ToastType.CONFIRM,
          message: '기록이 삭제되었습니다.',
        });

        setIsEditing(false);
        setCheckedItems([]);
      },
    });
  };

  const handleSubmit = () => setIsEditing(false);

  const postResponse = folderId ? postsByFolderId : categoryId ? postsByCategoryId : posts;
  const postData = postResponse?.pages || [{ posts: [], folderName: '', totalCount: 0 }];
  const { folderName, totalCount } = postData[0];

  const categoryBottomSheetItems = [
    {
      label: '기록 선택하기',
      onClick: () => {
        setIsEditing(true);
        toggleSheet();
      },
    },
  ];

  const folderBottomSheetItems = [
    ...categoryBottomSheetItems,
    {
      label: '폴더명 변경하기',
      onClick: () => {
        setDialogType('edit');
        setInputValue(folderName as string);
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

  const getBottomSheetItems = () => {
    return folderId && folderName !== '미분류' ? folderBottomSheetItems : categoryBottomSheetItems;
  };

  const bottomSheetItems = getBottomSheetItems();

  if (!postData.length) return <div>404</div>;

  return (
    <>
      <CommonAppBar>
        {!isEditing && (
          <CommonAppBar.Left>
            <CommonIconButton iconName="left" alt="이전" onClick={() => router.back()} />
            <HeaderTitle>{folderName || '모든 기록'}</HeaderTitle>
          </CommonAppBar.Left>
        )}
        <CommonAppBar.Right>
          {isEditing ? (
            <CommonIconButton iconName="close" onClick={() => setIsEditing(false)} />
          ) : (
            <CommonIconButton iconName="more" alt="더보기" onClick={() => toggleSheet()} />
          )}
        </CommonAppBar.Right>
      </CommonAppBar>
      {postData.map((item, index) => {
        return (
          <PostList
            key={index}
            isMine={false}
            postList={item.posts}
            isEditing={isEditing}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
        );
      })}
      {hasNextPage && (
        <LoadingContainer ref={setEntry}>
          <CommonLoading />
        </LoadingContainer>
      )}
      {isEditing ? (
        <BottomController>
          <BottomButton disabled={totalCount === 0}>전체 삭제</BottomButton>
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
          BottomSheetHeight={calcBottomSheetHeight({ folderSize: bottomSheetItems.length })}
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

const BottomController = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 48rem;
  height: 9rem;
  margin-left: -1.8rem;
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

const LoadingContainer = styled.div`
  margin: 2rem auto;
`;

export default PostListPage;
