import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { animated } from 'react-spring';
import theme from '@/styles/theme';
import { dropdownStateAtom } from '@/store/dropdown/atom';
import useAnimation from '@/hooks/useAnimation';
import LeftIcon from 'public/svgs/left.svg';
import Logo from 'public/images/logo.png';
import { ROUTES } from '@/shared/constants/routes';

const DropdownMenu = (): React.ReactElement => {
  const router = useRouter();
  const isDropdownOpen = useSetRecoilState(dropdownStateAtom);
  const { opacityAnimation, fullMenuAnimation } = useAnimation({
    onClose: () => isDropdownOpen(false),
  });

  const closeDropdown = () => {
    isDropdownOpen(false);
  };

  const goToMypage = () => {
    closeDropdown();
    router.push(`${ROUTES.MYPAGE}`);
  };

  const goToReadyPage = () => {
    closeDropdown();
    router.push(`${ROUTES.READY}`);
  };

  const dropdownRef = typeof window !== 'undefined' && document.getElementById('dropdown-menu');

  useEffect(() => {
    router.prefetch(`${ROUTES.MYPAGE}`);
    router.prefetch(`${ROUTES.READY}`);
  }, []);

  if (!dropdownRef) return <></>;

  return createPortal(
    <DropdownContainer>
      <Dimmed style={opacityAnimation} onClick={closeDropdown} />
      <DropdownWrapper>
        <DropdownInner style={fullMenuAnimation}>
          <Dropdown>
            <Image src={Logo} alt="moodpic" width={82} height={25} />
            <MenuList>
              <MenuItem onClick={goToMypage}>마이페이지</MenuItem>
              <MenuItem onClick={goToReadyPage}>피드백 / 문의사항 보내기</MenuItem>
              <MenuItem onClick={goToReadyPage}>개발자 소개</MenuItem>
              <MenuItem onClick={goToReadyPage}>SNS 계정</MenuItem>
            </MenuList>
            <ScrollUpButton onClick={closeDropdown}>
              <Image src={LeftIcon} alt="닫기" width={16} height={16} />
            </ScrollUpButton>
          </Dropdown>
        </DropdownInner>
      </DropdownWrapper>
    </DropdownContainer>,
    dropdownRef,
  );
};

const DropdownContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
`;

const Dimmed = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const DropdownWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
`;

const DropdownInner = styled(animated.div)`
  max-width: 48rem;
  width: 100%;
  max-height: 36.4rem;
  height: 100%;
  margin: 0 auto;
  background-color: ${theme.colors.gray2};
  border-radius: 0 0 3.5rem 3.5rem;
`;

const Dropdown = styled.div`
  padding: 4rem 3.6rem 2.2rem;
`;

const MenuList = styled.ul`
  margin-top: 1rem;
  list-style: none;
`;

const MenuItem = styled.li`
  cursor: pointer;
  padding: 2.2rem 0;
  ${theme.fonts.h6};
  color: ${theme.colors.white};

  & ~ & {
    border-top: 0.1rem solid ${theme.colors.gray3};
  }
`;

const ScrollUpButton = styled.button`
  display: flex;
  width: 1.6rem;
  height: 1.6rem;
  text-align: center;
  margin: 0 auto;
  transform: rotate(-270deg);
`;

export default DropdownMenu;
