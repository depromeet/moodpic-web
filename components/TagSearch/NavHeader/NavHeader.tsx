import { CommonAppBar, CommonIconButton } from '../../Common';
import React from 'react';

interface NavHeaderProps {
  onClickLeftIcon: () => void;
}

const NavHeader = ({ onClickLeftIcon }: NavHeaderProps) => {
  return (
    <CommonAppBar>
      <CommonAppBar.Left>
        <CommonIconButton iconName="left" alt="이전" onClick={onClickLeftIcon} />
      </CommonAppBar.Left>
    </CommonAppBar>
  );
};
export default NavHeader;
