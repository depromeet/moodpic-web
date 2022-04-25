import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { HOME_TAB_TYPE, CurrentTabType } from '@/shared/constants/home';

export interface TabHeaderProps {
  currentTab: CurrentTabType;
}

const TabHeader = ({ currentTab }: TabHeaderProps): React.ReactElement => {
  return (
    <TabHeaderContainer>
      <TabTitle>나의 기록</TabTitle>
      {currentTab === HOME_TAB_TYPE.FOLDER && <Button>편집</Button>}
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
  height: 52px;
  margin-top: 33px;
`;

const Button = styled.button`
  ${theme.fonts.h6};
  color: ${theme.colors.gray6};
`;

export default TabHeader;
