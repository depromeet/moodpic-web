import React, { useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import { isMobileSafari } from 'react-device-detect';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';
import useDialog from '@/hooks/useDialog';
import useInput from '@/hooks/useInput';
import {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useFoldersQuery,
  useIncompletedPostsQuery,
  usePostsByCategoryQuery,
  useUpdateFolderMutation,
} from '@/hooks/apis';
import useAddToHomescreenPrompt from '@/hooks/useAddToHomescreenPrompt';
import useBottomSheet from '@/hooks/useBottomSheet';
import { SESSION_STORAGE_KEY } from '@/shared/constants/storageKey';
import HomeTabs from '@/components/Home/Tabs/Tabs';
import HomeHeader from '@/components/Home/Header/Header';
import FolderList from '@/components/Home/FolderList/FolderList';
import { CommonBottomSheetContainer, CommonDialog } from '@/components/Common';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';
import CategoryFolderList from '@/components/Home/CategoryFolderList/CategoryFolderList';
import DialogWarning from '@/components/Dialog/DialogWarning';
import useToast from '@/hooks/useToast';
import { ToastType } from '@/shared/type/common';
import FloatingButtonGroup from '@/components/Home/FloatingButtonGroup/FloatingButtonGroup';
import HomeScreenGuide from '@/components/Home/HomeScreenGuide/HomeScreenGuide';
import HomeScreenBottomSheet from '@/components/Home/HomeScreenButtonSheet/HomeScreenButtonSheet';
import useIsMounted from '@/hooks/useIsMounted';
import BottomSheetList from '@/components/BottomSheetList/BottomSheetList';

const Home = () => {
  const [isVisible, promptToInstall] = useAddToHomescreenPrompt();
  const isMounted = useIsMounted();
  const [isEditMode, setIsEditMode] = useState(false);
  const { dialogVisible, toggleDialog } = useDialog();
  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } = useBottomSheet();
  const [bottomSheet, setBottomSheet] = useState({
    children: null,
    props: {},
  });
  const [inputValue, onChangeInput, setInputValue] = useInput('');
  const { data: folderResponse, isLoading } = useFoldersQuery();
  const { data: postResponse, refetch: fetchPosts } = usePostsByCategoryQuery();
  const { data: incompletedPosts } = useIncompletedPostsQuery();
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(HOME_TAB_TYPE.FOLDER);
  const [dialogType, setDialogType] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(0);
  const [bottomSheetType, setBottomSheetType] = useState('');

  const notify = useToast();
  const createFolderMutation = useCreateFolderMutation();
  const updateFolderMutation = useUpdateFolderMutation();
  const deleteFolderMutation = useDeleteFolderMutation();

  const bottomSheetItems = [
    {
      label: '폴더 편집',
      onClick: () => {
        setIsEditMode(true);
        toggleSheet();
      },
    },
    {
      label: '폴더 추가',
      onClick: () => {
        onAddDialog();
        toggleSheet();
      },
    },
  ];

  useEffect(() => {
    if (currentTab === HOME_TAB_TYPE.EMOTION) {
      setIsEditMode(false);
      fetchPosts();
    }
  }, [currentTab, fetchPosts]);

  useEffect(() => {
    if (!isMounted && isAlreadyViewed) return;

    renderAddToHomeScreen();
  }, [isMounted]);

  const hideHomeScreenBottomSheet = () => {
    toggleSheet();
    globalThis?.sessionStorage.setItem(SESSION_STORAGE_KEY.IS_ALREADY_VIEWED, 'true');
  };

  const isAlreadyViewed = Boolean(globalThis?.sessionStorage?.getItem(SESSION_STORAGE_KEY.IS_ALREADY_VIEWED));

  const handleCurrentTab = (tab: CurrentTabType) => setCurrentTab(tab);

  const showFolderBottomSheet = () => {
    toggleSheet();
    setBottomSheetType('folder');
  };

  const onAddDialog = () => {
    setDialogType('add');
    toggleDialog();
  };

  const onEdit = (id: number, name: string) => {
    setDialogType('edit');
    toggleDialog();
    setInputValue(name);
    setSelectedFolderId(id);
  };

  const onDelete = (id: number) => {
    setDialogType('delete');
    toggleDialog();
    setSelectedFolderId(id);
  };

  const onCloseDialog = () => {
    toggleDialog();
    setInputValue('');
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
      onError: (error) => {
        notify({
          type: ToastType.ERROR,
          message: (error as AxiosError).response?.data.msg,
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
            onClose={onCloseDialog}
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
            onClose={onCloseDialog}
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

  const renderHeader = useMemo(() => <HomeHeader />, []);

  const compositionComponents: {
    [key: string]: { children: JSX.Element; bottomSheetHeight: number; toggleSheet: () => void };
  } = {
    folder: {
      children: <BottomSheetList items={bottomSheetItems} />,
      bottomSheetHeight: calcBottomSheetHeight({ folderSize: 2 }),
      toggleSheet,
    },
    homeScreenGuide: {
      children: <HomeScreenGuide onClose={hideHomeScreenBottomSheet} />,
      bottomSheetHeight: 390,
      toggleSheet: hideHomeScreenBottomSheet,
    },
    homeScreen: {
      children: <HomeScreenBottomSheet onClick={promptToInstall} onClose={hideHomeScreenBottomSheet} />,
      bottomSheetHeight: 463,
      toggleSheet: hideHomeScreenBottomSheet,
    },
  };

  const renderAddToHomeScreen = () => {
    if (isMobileSafari) {
      setBottomSheetType('homeScreenGuide');
      return;
    }

    if (isVisible) {
      setBottomSheetType('homeScreen');
    }

    toggleSheet();
  };

  //TODO: 이후 Loading develop
  if (isLoading && folderResponse) return <div>로딩중</div>;
  const folderLength = folderResponse?.folders.length || 0;

  return (
    <>
      {renderHeader}
      <HomeTabs
        currentTab={currentTab}
        isEditMode={isEditMode}
        setCurrentTab={handleCurrentTab}
        toggleEditMode={() => setIsEditMode(!isEditMode)}
        onClick={showFolderBottomSheet}
      />
      {currentTab === HOME_TAB_TYPE.FOLDER && folderLength && (
        <FolderListContainer>
          <FolderList
            isEditMode={isEditMode}
            folderList={folderResponse?.folders || []}
            thumbnailList={folderResponse?.postsThumbnail}
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
      {isVisibleSheet && (
        <CommonBottomSheetContainer
          onClose={() => compositionComponents[bottomSheetType].toggleSheet()}
          bottomSheetHeight={compositionComponents[bottomSheetType]?.bottomSheetHeight || 0}
        >
          {compositionComponents[bottomSheetType] && compositionComponents[bottomSheetType].children}
        </CommonBottomSheetContainer>
      )}
    </>
  );
};

const FolderListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.8rem;
  row-gap: 1.4rem;
  padding-top: 1.2rem;
`;

export default Home;
