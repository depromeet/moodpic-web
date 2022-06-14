import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import FolderIcon from 'public/svgs/folderplus.svg';
import { HOME_TAB_TYPE, HOME_TAB_LABEL, CurrentTabType } from '@/shared/constants/home';

interface Tab {
  key: CurrentTabType;
  label: typeof HOME_TAB_LABEL[keyof typeof HOME_TAB_LABEL];
}

export interface TabsProps {
  currentTab: CurrentTabType;
  setCurrentTab: (tab: CurrentTabType) => void;
  onClick: () => void;
}

const Tabs = ({ currentTab, setCurrentTab, onClick }: TabsProps): React.ReactElement => {
  const tabList = [
    {
      key: HOME_TAB_TYPE.FOLDER,
      label: HOME_TAB_LABEL.FOLDER,
    },
    {
      key: HOME_TAB_TYPE.EMOTION,
      label: HOME_TAB_LABEL.EMOTION,
    },
  ];

  return (
    <TabContainer>
      <TabList>
        {tabList.map((tab: Tab) => {
          return (
            <TabButton key={tab.key} activate={currentTab === tab.key} onClick={() => setCurrentTab(tab.key)}>
              {tab.label}
            </TabButton>
          );
        })}
        {currentTab === HOME_TAB_TYPE.FOLDER && (
          <FolderImage onClick={onClick}>
            <Image src={FolderIcon} alt="폴더 추가" />
          </FolderImage>
        )}
      </TabList>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  position: sticky;
  top: 4.4rem;
  margin-right: -1.8rem;
  margin-left: -1.8rem;
  padding: 0 1.8rem;
  border-bottom: 0.1rem solid ${theme.colors.gray1};
  z-index: 1;
`;

const TabList = styled.div`
  display: flex;
  background-color: ${theme.colors.black};
`;

const FolderImage = styled.button`
  justify-self: flex-end;
  margin-left: auto;
`;

const TabButton = styled.button<{ activate: boolean }>`
  padding: 1.1rem 0;
  ${theme.fonts.h4};
  color: ${(props) => (props.activate ? theme.colors.white : theme.colors.gray4)};
  border-bottom: ${(props) =>
    props.activate &&
    css`
    0.1rem solid ${theme.colors.primary}
  `};

  & ~ & {
    margin-left: 1.6rem;
  }
`;

export default Tabs;
