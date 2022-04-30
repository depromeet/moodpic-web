import theme from '@/styles/theme';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import Image from 'next/image';
import styled from 'styled-components';
import LeftIcon from 'public/svgs/left.svg';
import { createPortal } from 'react-dom';
import { dropdownStateAtom } from '@/store/dropdown/atom';

const DropdownMenu = (): React.ReactElement | null => {
  const setDropdownState = useSetRecoilState(dropdownStateAtom);

  const dropdownRef =
    typeof window !== 'undefined' && document.getElementById('dropdown-menu');

  const unsetDropdownState = () => {
    setDropdownState(false);
  };

  if (!dropdownRef) return null;

  return createPortal(
    <DropdownContainer>
      <Dimmed onClick={unsetDropdownState} />
      <Dropdown>
        <LogoTitle>서비스명</LogoTitle>
        <MenuList>
          <MenuItem>마이페이지</MenuItem>
          <MenuItem>피드백 / 문의사항 보내기</MenuItem>
          <MenuItem>개발자 소개</MenuItem>
          <MenuItem>SNS 계정</MenuItem>
        </MenuList>
        <ScrollUpButton onClick={unsetDropdownState}>
          <Image src={LeftIcon} alt="닫기" width={16} height={16} />
        </ScrollUpButton>
      </Dropdown>
    </DropdownContainer>,
    dropdownRef,
  );
};

const DropdownContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: 480px;
  height: 100%;
  margin: 0 auto;
  z-index: 10000;
`;

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(68, 53, 53, 0.6);
`;

const LogoTitle = styled.h2`
  margin-bottom: 12px;
  ${theme.fonts.h4};
  color: ${theme.colors.primary};
`;

const Dropdown = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 33px 36px 42px;
  background-color: ${theme.colors.gray2};
  border-radius: 0 0 35px 35px;
  z-index: 1;
`;

const MenuList = styled.ul`
  list-style: none;
`;

const MenuItem = styled.li`
  padding: 22px 0;
  ${theme.fonts.h6};
  color: ${theme.colors.white};

  & ~ & {
    border-top: 1px solid ${theme.colors.gray3};
  }
`;

const ScrollUpButton = styled.button`
  position: absolute;
  right: 50%;
  width: 16px;
  height: 16px;
  text-align: center;
  margin: 0 auto;
  transform: rotate(-270deg);
`;

export default DropdownMenu;
