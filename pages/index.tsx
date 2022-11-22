import React, { useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import { isMobileSafari } from 'react-device-detect';
import { HOME_TAB_TYPE, CurrentTabType, MINIMUM_FOLDER_SIZE } from '@/shared/constants/home';
import useDialog from '@/hooks/useDialog';
import useInput from '@/hooks/useInput';
import {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useFoldersQuery,
  useIncompletedPostsQuery,
  useMemberQuery,
  usePostsByCategoryQuery,
  useUpdateFolderMutation,
} from '@/hooks/apis';
import useRandomBanner from '@/hooks/useRandomBanner';
import useAddToHomescreenPrompt from '@/hooks/useAddToHomescreenPrompt';
import useBottomSheet from '@/hooks/useBottomSheet';
import { SESSION_STORAGE_KEY } from '@/shared/constants/storageKey';
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
import useIsMounted from '@/hooks/useIsMounted';
import HomeScreenGuide from '@/components/Home/HomeScreenGuide/HomeScreenGuide';
import HomeScreenBottomSheet from '@/components/Home/HomeScreenButtonSheet/HomeScreenButtonSheet';

const Home = () => {
  const [isVisible, promptToInstall] = useAddToHomescreenPrompt();
  const [isEditMode, setIsEditMode] = useState(false);
  const isMounted = useIsMounted();
  const { dialogVisible, toggleDialog } = useDialog();
  const { toggleSheet } = useBottomSheet();
  const [inputValue, onChangeInput, setInputValue] = useInput('');
  const { data: folderResponse, isLoading } = useFoldersQuery();
  const { data: postResponse, refetch: fetchPosts } = usePostsByCategoryQuery();
  const { data: incompletedPosts } = useIncompletedPostsQuery();
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(HOME_TAB_TYPE.FOLDER);
  const [dialogType, setDialogType] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(0);
  const notify = useToast();
  const { data: me } = useMemberQuery();
  const createFolderMutation = useCreateFolderMutation();
  const updateFolderMutation = useUpdateFolderMutation();
  const deleteFolderMutation = useDeleteFolderMutation();

  const randomTitleCases = [
    <>
      님의 <br />
      모든 감정은 소중해잉 🥺
    </>,
    <>
      님, 감정을 되짚어보면 <br />
      기분이 나아질거예요!
    </>,
    <>
      님, 오늘 어떤 일이 <br />
      있었는지 들려주세요!
    </>,
    <>
      님, 오늘의 감정을 <br />
      풀어보는 시간을 가져볼까요?
    </>,
  ];
  const { randomImageSource, randomTitle } = useRandomBanner(randomTitleCases);

  useEffect(() => {
    if (currentTab === HOME_TAB_TYPE.EMOTION) {
      setIsEditMode(false);
      fetchPosts();
    }
  }, [currentTab, fetchPosts]);

  const hideHomeScreenBottomSheet = () => {
    toggleSheet();
    globalThis?.sessionStorage.setItem(SESSION_STORAGE_KEY.IS_ALREADY_VIEWED, 'true');
  };

  const isAlreadyViewed = Boolean(globalThis?.sessionStorage?.getItem(SESSION_STORAGE_KEY.IS_ALREADY_VIEWED));

  const handleCurrentTab = (tab: CurrentTabType) => setCurrentTab(tab);

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

  const renderAddToHomeScreen = () => {
    if (isAlreadyViewed) return;

    if (isMobileSafari) {
      return <HomeScreenGuide toggleSheet={hideHomeScreenBottomSheet} onClose={hideHomeScreenBottomSheet} />;
    }

    if (isVisible) {
      return (
        <HomeScreenBottomSheet
          onClick={promptToInstall}
          toggleSheet={hideHomeScreenBottomSheet}
          onClose={hideHomeScreenBottomSheet}
        />
      );
    }
  };

  //TODO: 이후 Loading develop
  if (isLoading && folderResponse) return <div>로딩중</div>;
  const folderLength = folderResponse?.folders.length || 0;

  return (
    <>
      {renderHeader}
      {isMounted && <HomeBanner nickname={me?.nickname || ''} title={randomTitle} background={randomImageSource} />}
      <HomeTabHeader
        currentTab={currentTab}
        canEdit={folderLength > MINIMUM_FOLDER_SIZE}
        isEditMode={isEditMode}
        toggleEditMode={() => setIsEditMode(!isEditMode)}
      />
      <HomeTabs currentTab={currentTab} setCurrentTab={handleCurrentTab} onClick={onAddDialog} />
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
      {renderAddToHomeScreen()}
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
