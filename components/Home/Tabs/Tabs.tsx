import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { CommonIconButton } from '@/components/Common';
import { HOME_TAB_TYPE, HOME_TAB_LABEL, CurrentTabType } from '@/shared/constants/home';

interface Tab {
  key: CurrentTabType;
  label: typeof HOME_TAB_LABEL[keyof typeof HOME_TAB_LABEL];
}

export interface TabsProps {
  currentTab: CurrentTabType;
  setCurrentTab: (tab: CurrentTabType) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  onClick: () => void;
}

const Tabs = ({ currentTab, setCurrentTab, isEditMode, toggleEditMode, onClick }: TabsProps): React.ReactElement => {
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
          <ButtonContainer>
            {isEditMode ? (
              <ActivateButton onClick={toggleEditMode}>완료</ActivateButton>
            ) : (
              <CommonIconButton iconName="more" alt="더보기" onClick={onClick} />
            )}
          </ButtonContainer>
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
  z-index: 1;
`;

const TabList = styled.div`
  display: flex;
  background-color: ${theme.colors.black};
`;

const TabButton = styled.button<{ activate: boolean }>`
  padding: 1.1rem 0;
  ${theme.fonts.h3};
  font-weight: normal;
  color: ${(props) => (props.activate ? theme.colors.white : '#505051')};

  & ~ & {
    margin-left: 1.6rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const ActivateButton = styled.button`
  ${theme.fonts.h6};
  color: ${theme.colors.primary};
`;

export default Tabs;
