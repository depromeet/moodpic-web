import React, { useState } from 'react';
import HomeBanner from '@/components/Home/Banner';
import HomeTab, { CurrentTabType } from '@/components/Home/Tab';
import { HOME_TAB_TYPE } from '@/shared/constants/home';

const Home = () => {
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(
    HOME_TAB_TYPE.FOLDER,
  );

  return (
    <>
      <HomeBanner nickname="홍길동" />
      <HomeTab
        currentTab={currentTab}
        setCurrentTab={(tab: CurrentTabType) => setCurrentTab(tab)}
        onClick={() => console.log('폴더 추가')}
      />
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
