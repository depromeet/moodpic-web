import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { tooltipStateAtom } from '@/store/tooltip/atom';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';
import { transition } from '@/styles/mixins';
import useDialog from '@/hooks/useDialog';
import useInput from '@/hooks/useInput';
import HomeBanner from '@/components/Home/Banner/Banner';
import HomeTabHeader from '@/components/Home/TabHeader/TabHeader';
import HomeTabs from '@/components/Home/Tabs/Tabs';
import HomeHeader from '@/components/Home/Header/Header';
import FolderList from '@/components/Home/FolderList/FolderList';
import {
  CommonButton,
  CommonDialog,
  CommonWritingButton,
} from '@/components/Common';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';

const Home = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(
    HOME_TAB_TYPE.FOLDER,
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { dialogVisible, toggleDialog } = useDialog();
  const { inputValue, onChangeInput } = useInput('');
  const setTooltipState = useSetRecoilState(tooltipStateAtom);

  const goToUndefinedFeelings = () => {
    router.push('/posts/undefined-feelings');
  };

  const handleCurrentTab = (tab: CurrentTabType) => setCurrentTab(tab);

  const goToWritePage = () => {
    router.push('/write');
    setTooltipState(true);
  };

  return (
    <>
      <HomeHeader />
      <HomeBanner nickname="홍길동" />
      <HomeTabHeader
        currentTab={currentTab}
        isEditMode={isEditMode}
        toggleEditMode={() => setIsEditMode(!isEditMode)}
      />
      <HomeTabs
        currentTab={currentTab}
        setCurrentTab={handleCurrentTab}
        onClick={toggleDialog}
      />
      <FolderList isEditMode={isEditMode} />
      <CommonWritingButton onClick={goToWritePage} />
      <FloatingContainer>
        <div>
          <CommonButton color="gray" onClick={goToUndefinedFeelings}>
            지난 감정 되돌아보기
          </CommonButton>
        </div>
      </FloatingContainer>
      {dialogVisible && (
        <CommonDialog
          type="modal"
          onClose={toggleDialog}
          disabledConfirm={inputValue === ''}
          onConfirm={toggleDialog}
        >
          <DialogFolderForm value={inputValue} onChange={onChangeInput} />
        </CommonDialog>
      )}
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
