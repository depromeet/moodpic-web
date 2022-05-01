import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';
import HomeBanner from '@/components/Home/Banner/Banner';
import HomeTabHeader from '@/components/Home/TabHeader/TabHeader';
import HomeTabs from '@/components/Home/Tabs/Tabs';
import BottomSheetExample from '@/components/Example/BottomSheetExample';
import ModalExample from '@/components/Example/ModalExample';
import FolderList from '@/components/Home/FolderList/FolderList';
import WritingButon from '@/components/Common/WritingButton/WritingButton';
import ToastExample from '@/components/Example/ToastExample';

const Home = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(
    HOME_TAB_TYPE.FOLDER,
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <>
      <HomeBanner nickname="홍길동" />
      <HomeTabHeader
        currentTab={currentTab}
        isEditMode={isEditMode}
        toggleEditMode={() => setIsEditMode(!isEditMode)}
      />
      <HomeTabs
        currentTab={currentTab}
        setCurrentTab={(tab: CurrentTabType) => setCurrentTab(tab)}
        onClick={() => console.log('폴더 추가')}
      />
      <BottomSheetExample />
      <ToastExample />
      <ModalExample />
      <FolderList />
      <WritingButon onClick={() => router.push('/write')} />
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  if (typeof window === 'undefined') {
    (async () => {
      const { server } = await import('@/mocks/server');
      server.listen();
    })();
  } else {
    (async () => {
      const { worker } = await import('@/mocks/browser');
      worker.start();
    })();
  }
}

export default Home;
