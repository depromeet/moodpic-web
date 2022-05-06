import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';
import { transition } from '@/styles/mixins';
import HomeBanner from '@/components/Home/Banner/Banner';
import HomeTabHeader from '@/components/Home/TabHeader/TabHeader';
import HomeTabs from '@/components/Home/Tabs/Tabs';
import FolderList from '@/components/Home/FolderList/FolderList';
import { CommonButton, CommonWritingButton } from '@/components/Common';

const Home = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(
    HOME_TAB_TYPE.FOLDER,
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const goToUndefinedFeelings = () => {
    router.push('/posts/undefined-feelings');
  };

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
      <FolderList isEditMode={isEditMode} />
      <CommonWritingButton onClick={() => router.push('/write/pre-emotion')} />
      <FloatingContainer>
        <div>
          <CommonButton color="gray" onClick={goToUndefinedFeelings}>
            지난 감정 되돌아보기
          </CommonButton>
        </div>
      </FloatingContainer>
    </>
  );
};

const FloatingContainer = styled.div`
  ${transition()};
  position: fixed;
  left: 0;
  bottom: 5.6rem;
  width: 100%;
  z-index: 1001;

  > div {
    width: 22.3rem;
    margin: 0 auto;
  }
`;

export default Home;
