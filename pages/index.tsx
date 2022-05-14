import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { tooltipStateAtom } from '@/store/tooltip/atom';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';
import { transition } from '@/styles/mixins';
import theme from '@/styles/theme';
import useDialog from '@/hooks/useDialog';
import useInput from '@/hooks/useInput';
import { useFoldersQuery } from '@/hooks/apis';
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
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isScrollOnTop, setIsScrollOnTop] = useState<boolean>(true);
  const { dialogVisible, toggleDialog } = useDialog();
  const { inputValue, onChangeInput } = useInput('');
  const setTooltipState = useSetRecoilState(tooltipStateAtom);
  const { data } = useFoldersQuery();
  const [currentTab, setCurrentTab] = useState<CurrentTabType>(
    HOME_TAB_TYPE.FOLDER,
  );

  const handleScroll = () => {
    setIsScrollOnTop(window.scrollY === 0);
  };

  const goToUndefinedFeelings = () => {
    router.push('/posts/undefined-feelings');
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
      <FloatingContainer isHidden={!isScrollOnTop}>
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
      {!isScrollOnTop && <CommonWritingButton onClick={goToWritePage} />}
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

const FloatingContainer = styled.div<{ isHidden: boolean }>`
  ${transition()};
  position: fixed;
  left: 0;
  bottom: 5.6rem;
  width: 100%;
  z-index: 1001;
  ${(props) =>
    props.isHidden &&
    css`
      transform: translate3d(0, 200%, 0);
    `};

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
