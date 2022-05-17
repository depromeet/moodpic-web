import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { tooltipStateAtom } from '@/store/tooltip/atom';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';
import useDialog from '@/hooks/useDialog';
import useInput from '@/hooks/useInput';
import { useFoldersQuery, useIncompletePostsQuery } from '@/hooks/apis';
import HomeBanner from '@/components/Home/Banner/Banner';
import HomeTabHeader from '@/components/Home/TabHeader/TabHeader';
import HomeTabs from '@/components/Home/Tabs/Tabs';
import HomeHeader from '@/components/Home/Header/Header';
import FolderList from '@/components/Home/FolderList/FolderList';
import HomeFloatingButton from '@/components/Home/FloatingButton/FloatingButton';
import { CommonDialog, CommonWritingButton } from '@/components/Common';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';

const Home = () => {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isScrollOnTop, setIsScrollOnTop] = useState<boolean>(true);
  const { dialogVisible, toggleDialog } = useDialog();
  const { inputValue, onChangeInput } = useInput('');
  const setTooltipState = useSetRecoilState(tooltipStateAtom);
  const { data: folderResponse } = useFoldersQuery();
  const { data: incompletePosts } = useIncompletePostsQuery();
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
    }
  }, [currentTab]);

  const handleCurrentTab = (tab: CurrentTabType) => setCurrentTab(tab);

  const goToWritePage = () => {
    router.push('/write');
    setTooltipState(true);
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
      {folderResponse?.folders.length && (
        <FolderList
          isEditMode={isEditMode}
          folderList={folderResponse.folders}
          supportsCollectedFolder={currentTab === HOME_TAB_TYPE.FOLDER}
        />
      )}
      <CommonWritingButton onClick={goToWritePage} />
      {incompletePosts?.length && <HomeFloatingButton isScrollOnTop={isScrollOnTop} />}
      {!isScrollOnTop && <CommonWritingButton onClick={goToWritePage} />}
      {dialogVisible && (
        <CommonDialog type="modal" onClose={toggleDialog} disabledConfirm={inputValue === ''} onConfirm={toggleDialog}>
          <DialogFolderForm value={inputValue} onChange={onChangeInput} />
        </CommonDialog>
      )}
    </>
  );
};

export default Home;
