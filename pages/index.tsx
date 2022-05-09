import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { tooltipStateAtom } from '@/store/tooltip/atom';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';
import { transition } from '@/styles/mixins';
import theme from '@/styles/theme';
import useDialog from '@/hooks/useDialog';
import useInput from '@/hooks/useInput';
import { useFoldersQuery } from '@/hooks/query/useFoldersQuery';
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
import RightIcon from 'public/svgs/right-small.svg';

const Home = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(
    HOME_TAB_TYPE.FOLDER,
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { dialogVisible, toggleDialog } = useDialog();
  const { inputValue, onChangeInput } = useInput('');
  const setTooltipState = useSetRecoilState(tooltipStateAtom);
  const { data } = useFoldersQuery();

  const goToUndefinedFeelings = () => {
    router.push('/posts/undefined-feelings');
  };

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
      {data && (
        <FolderList
          isEditMode={isEditMode}
          folderList={data.folders}
          supportsCollectedFolder={currentTab === HOME_TAB_TYPE.FOLDER}
        />
      )}
      <CommonWritingButton onClick={goToWritePage} />
      <FloatingContainer>
        <div>
          <CommonButton color="gray" onClick={goToUndefinedFeelings}>
            <ButtonText>
              &apos;모르겠어요&apos;를 선택한 기록들
              <ButtonIcon>
                <Image src={RightIcon} alt="" />
              </ButtonIcon>
            </ButtonText>
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

const ButtonText = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1.9rem 0 2.2rem;
  ${theme.fonts.btn2};
`;

const ButtonIcon = styled.i`
  position: absolute;
  top: 0;
  right: 1.9rem;
`;

export default Home;
