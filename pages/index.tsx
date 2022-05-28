import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';
import useDialog from '@/hooks/useDialog';
import { useTypeInput } from '@/hooks/useTypeInput';
import {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useFoldersQuery,
  useIncompletedPostsQuery,
  usePostsByCategoryQuery,
  useUpdateFolderMutation,
} from '@/hooks/apis';
import { useRandomBanner } from '@/hooks/useRandomBanner';
import HomeBanner from '@/components/Home/Banner/Banner';
import HomeTabHeader from '@/components/Home/TabHeader/TabHeader';
import HomeTabs from '@/components/Home/Tabs/Tabs';
import HomeHeader from '@/components/Home/Header/Header';
import FolderList from '@/components/Home/FolderList/FolderList';
import { CommonDialog } from '@/components/Common';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';
import CategoryFolderList from '@/components/Home/CategoryFolderList/CategoryFolderList';
import DialogWarning from '@/components/Dialog/DialogWarning';
import useToast from '@/hooks/useToast';
import { ToastType } from '@/shared/type/common';
import FloatingButtonGroup from '@/components/Home/FloatingButtonGroup/FloatingButtonGroup';
import { useIsMounted } from '@/hooks/useIsMounted';

const Home = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const isMounted = useIsMounted();
  const { dialogVisible, toggleDialog } = useDialog();
  const [inputValue, onChangeInput, setInputValue] = useTypeInput('');
  const { randomTitle, randomImageSource } = useRandomBanner();
  const { data: folderResponse, refetch: fetchFolders } = useFoldersQuery();
  const { data: postResponse, refetch: fetchPosts } = usePostsByCategoryQuery();
  const { data: incompletedPosts } = useIncompletedPostsQuery();
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(HOME_TAB_TYPE.FOLDER);
  const [dialogType, setDialogType] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(0);
  const notify = useToast();
  const createFolderMutation = useCreateFolderMutation();
  const updateFolderMutation = useUpdateFolderMutation();
  const deleteFolderMutation = useDeleteFolderMutation();

  useEffect(() => {
    if (currentTab === HOME_TAB_TYPE.EMOTION) {
      setIsEditMode(false);
      fetchPosts();
    }

    if (currentTab === HOME_TAB_TYPE.FOLDER) {
      fetchFolders();
    }
  }, [currentTab, fetchPosts, fetchFolders]);

  const handleCurrentTab = (tab: CurrentTabType) => setCurrentTab(tab);

  const onAddDialog = () => {
    setDialogType('add');
    toggleDialog();
  };

  const onEdit = (id: number) => {
    setDialogType('edit');
    toggleDialog();
    setSelectedFolderId(id);
  };

  const onDelete = (id: number) => {
    setDialogType('delete');
    toggleDialog();
    setSelectedFolderId(id);
  };

  const createFolder = () => {
    createFolderMutation.mutate(inputValue, {
      onSuccess: () => {
        notify({
          type: ToastType.CONFIRM,
          message: '폴더가 추가되었습니다.',
        });
        setInputValue('');
        toggleDialog();
      },
      onError: () => {
        notify({
          type: ToastType.ERROR,
          message: '이미 중복된 폴더명이에요.',
        });
      },
    });
  };

  const editFolder = (id: number) => {
    updateFolderMutation.mutate(
      { id, folderName: inputValue },
      {
        onSuccess: () => {
          notify({
            type: ToastType.CONFIRM,
            message: '폴더명이 변경되었습니다.',
          });
          setInputValue('');
          toggleDialog();
        },
        onError: (error) => {
          // TODO: type assertion 제거 및 error 관련 type 정의 추가
          notify({
            type: ToastType.ERROR,
            message: (error as AxiosError).response?.data.msg,
          });
        },
      },
    );
  };

  const deleteFolder = (id: number) => {
    deleteFolderMutation.mutate(id, {
      onSuccess: () => {
        notify({
          type: ToastType.CONFIRM,
          message: '폴더가 삭제되었습니다.',
        });
        toggleDialog();
      },
    });
  };

  const renderDialog = () => {
    switch (dialogType) {
      case 'add':
        return (
          <CommonDialog
            type="modal"
            onClose={toggleDialog}
            disabledConfirm={inputValue === ''}
            onConfirm={createFolder}
          >
            <DialogFolderForm value={inputValue} onChange={onChangeInput} />
          </CommonDialog>
        );
      case 'edit':
        return (
          <CommonDialog
            type="modal"
            onClose={toggleDialog}
            disabledConfirm={inputValue === ''}
            onConfirm={() => editFolder(selectedFolderId)}
          >
            <DialogFolderForm isEditMode={true} value={inputValue} onChange={onChangeInput} />
          </CommonDialog>
        );
      case 'delete':
        return (
          <CommonDialog type="alert" onClose={toggleDialog} onConfirm={() => deleteFolder(selectedFolderId)}>
            <DialogWarning>폴더를 삭제하시겠습니까?</DialogWarning>
          </CommonDialog>
        );
    }
  };

  return (
    <>
      <HomeHeader />
      {isMounted() && <HomeBanner nickname="홍길동" title={randomTitle} background={randomImageSource} />}
      <HomeTabHeader
        currentTab={currentTab}
        isEditMode={isEditMode}
        toggleEditMode={() => setIsEditMode(!isEditMode)}
      />
      <HomeTabs currentTab={currentTab} setCurrentTab={handleCurrentTab} onClick={onAddDialog} />
      {currentTab === HOME_TAB_TYPE.FOLDER && folderResponse?.folders.length && (
        <FolderListContainer>
          <FolderList
            isEditMode={isEditMode}
            folderList={folderResponse.folders}
            supportsCollectedFolder={currentTab === HOME_TAB_TYPE.FOLDER}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </FolderListContainer>
      )}
      {currentTab === HOME_TAB_TYPE.EMOTION && postResponse?.length && (
        <FolderListContainer>
          <CategoryFolderList list={postResponse} />
        </FolderListContainer>
      )}
      <FloatingButtonGroup hasIncompletedPosts={!!incompletedPosts?.length} />
      {dialogVisible && renderDialog()}
    </>
  );
};

const FolderListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.8rem;
  row-gap: 1.4rem;
  padding-top: 2rem;
`;

export default Home;
