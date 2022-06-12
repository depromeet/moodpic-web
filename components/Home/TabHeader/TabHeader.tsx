import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';

export interface TabHeaderProps {
  currentTab: CurrentTabType;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const TabHeader = ({ currentTab, isEditMode, toggleEditMode }: TabHeaderProps): React.ReactElement => {
  const EditButton = (): React.ReactElement => {
    const buttonLabel = isEditMode ? '편집종료' : '편집';
    return (
      <Button highlight={isEditMode} onClick={toggleEditMode}>
        {buttonLabel}
      </Button>
    );
  };

  return (
    <TabHeaderContainer>
      <TabTitle>나의 기록</TabTitle>
      {currentTab === HOME_TAB_TYPE.FOLDER && <EditButton />}
    </TabHeaderContainer>
  );
};

const TabTitle = styled.h3`
  ${theme.fonts.h3};
  color: ${theme.colors.gray6};
`;

const TabHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.2rem;
  margin-top: 3.3rem;
`;

const Button = styled.button<{ highlight: boolean }>`
  ${theme.fonts.h6};
  color: ${(props) => (props.highlight ? theme.colors.primary : theme.colors.gray6)};
`;

export default TabHeader;
