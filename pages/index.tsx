import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { tooltipStateAtom } from '@/store/tooltip/atom';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';
import useDialog from '@/hooks/useDialog';
import { useTypeInput } from '@/hooks/useTypeInput';
import {
  useCreateFolderMutation,
  useFoldersQuery,
  useIncompletePostsQuery,
  usePostsByCategoryQuery,
} from '@/hooks/apis';
import useToast from '@/hooks/useToast';
import HomeBanner from '@/components/Home/Banner/Banner';
import HomeTabHeader from '@/components/Home/TabHeader/TabHeader';
import HomeTabs from '@/components/Home/Tabs/Tabs';
import HomeHeader from '@/components/Home/Header/Header';
import FolderList from '@/components/Home/FolderList/FolderList';
import HomeFloatingButton from '@/components/Home/FloatingButton/FloatingButton';
import { CommonDialog, CommonWritingButton } from '@/components/Common';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';
import CategoryFolderList from '@/components/Home/CategoryFolderList/CategoryFolderList';

const Home = () => {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isScrollOnTop, setIsScrollOnTop] = useState<boolean>(true);
  const { dialogVisible, toggleDialog } = useDialog();
  const [inputValue, onChangeInput, setInputValue] = useTypeInput('');
  const setTooltipState = useSetRecoilState(tooltipStateAtom);
  const { data: folderResponse, refetch: fetchFolders } = useFoldersQuery();
  const { data: postResponse, refetch: fetchPosts } = usePostsByCategoryQuery();
  const { data: incompletePosts } = useIncompletePostsQuery();
  const notify = useToast();
  const createFolderMutation = useCreateFolderMutation();
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(HOME_TAB_TYPE.FOLDER);

  const handleScroll = () => {
    setIsScrollOnTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

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

  const goToWritePage = () => {
    router.push('/write');
    setTooltipState(true);
  };

  const onAddFolder = () => {
    createFolderMutation.mutate(inputValue, {
      onSuccess: () => {
        setInputValue('');
        toggleDialog();
        notify({ type: 'confirm', message: '폴더가 생성되었습니다.' });
        fetchFolders();
      },
      onError: () => {
        // TODO: 하드코딩된 에러메세지 수정 필요함.
        notify({ type: 'error', message: '이미 존재하는 폴더명이에요.' });
      },
    });
  };

  return (
    <>
      <HomeHeader isScrollOnTop={isScrollOnTop} />
      <HomeBanner nickname="홍길동" />
      <HomeTabHeader
        currentTab={currentTab}
        isEditMode={isEditMode}
        toggleEditMode={() => setIsEditMode(!isEditMode)}
      />
      <HomeTabs currentTab={currentTab} setCurrentTab={handleCurrentTab} onClick={toggleDialog} />
      {currentTab === HOME_TAB_TYPE.FOLDER && folderResponse?.folders.length && (
        <FolderListContainer>
          <FolderList
            isEditMode={isEditMode}
            folderList={folderResponse.folders}
            supportsCollectedFolder={currentTab === HOME_TAB_TYPE.FOLDER}
          />
        </FolderListContainer>
      )}
      {currentTab === HOME_TAB_TYPE.EMOTION && postResponse?.length && (
        <FolderListContainer>
          <CategoryFolderList list={postResponse} />
        </FolderListContainer>
      )}
      <CommonWritingButton onClick={goToWritePage} />
      {incompletePosts?.length && <HomeFloatingButton isScrollOnTop={isScrollOnTop} />}
      {!isScrollOnTop && <CommonWritingButton onClick={goToWritePage} />}
      {dialogVisible && (
        <CommonDialog type="modal" onClose={toggleDialog} disabledConfirm={inputValue === ''} onConfirm={onAddFolder}>
          <DialogFolderForm value={inputValue} onChange={onChangeInput} />
        </CommonDialog>
      )}
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
