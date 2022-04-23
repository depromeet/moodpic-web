import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import FolderIcon from '@/assets/icons/folderplus.svg';
import { HOME_TAB_TYPE, HOME_TAB_LABEL } from '@/shared/constants/home';

export type CurrentTabType = typeof HOME_TAB_TYPE[keyof typeof HOME_TAB_TYPE];

interface Tab {
  key: CurrentTabType;
  label: typeof HOME_TAB_LABEL[keyof typeof HOME_TAB_LABEL];
}

export interface TabProps {
  currentTab: CurrentTabType;
  setCurrentTab: (tab: CurrentTabType) => void;
  onClick: () => void;
}

const Tab = ({
  currentTab,
  setCurrentTab,
  onClick,
}: TabProps): React.ReactElement => {
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

  const FolderPlus = () => {
    return (
      <FolderImage onClick={onClick}>
        <Image src={FolderIcon} alt="폴더 추가" />
      </FolderImage>
    );
  };

  return (
    <TabContainer>
      <TabHeader>
        <TabTitle>나의 기록</TabTitle>
        {currentTab === HOME_TAB_TYPE.FOLDER && <Button>편집</Button>}
      </TabHeader>
      <Tabs>
        {tabList.map((tab: Tab) => {
          return (
            <TabButton
              key={tab.key}
              activate={currentTab === tab.key}
              onClick={() => setCurrentTab(tab.key)}
            >
              {tab.label}
            </TabButton>
          );
        })}
        {currentTab === HOME_TAB_TYPE.FOLDER && <FolderPlus />}
      </Tabs>
    </TabContainer>
  );
};

const TabTitle = styled.h3`
  ${theme.fonts.h3};
  color: ${theme.colors.gray6};
`;

const TabHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
`;

const TabContainer = styled.div`
  padding-top: 33px;
`;

const Tabs = styled.div`
  display: flex;
  position: relative;
`;

const FolderImage = styled.button`
  justify-self: flex-end;
  margin-left: auto;
`;

const Button = styled.button`
  ${theme.fonts.h6};
  color: ${theme.colors.gray6};
`;

const TabButton = styled.button<{ activate: boolean }>`
  padding: 11px 0;
  ${theme.fonts.h4};
  color: ${(props) =>
    props.activate ? theme.colors.white : theme.colors.gray4};
  border-bottom: ${(props) =>
    props.activate &&
    css`
    1px solid ${theme.colors.primary}
  `};

  & ~ & {
    margin-left: 16px;
  }
`;

export default Tab;
