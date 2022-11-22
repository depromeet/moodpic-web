import React from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import Link from 'next/link';
import { dropdownStateAtom } from '@/store/dropdown/atom';
import { HeaderWrapper, TitleWrapper, LogoContainer, Title } from './Header.styles';
import CaretDownPrimary from 'public/svgs/caretdown-primary.svg';
import { CommonIconButton } from '@/components/Common';
import Logo from 'public/images/logo.png';
import styled from 'styled-components';

interface HeaderProps {
  hasOnlyTitle?: boolean;
}

const Header = ({ hasOnlyTitle = false }: HeaderProps) => {
  const isDropdownOpen = useSetRecoilState<boolean>(dropdownStateAtom);

  const handleLogoClick = () => {
    isDropdownOpen(true);
  };

  return (
    <>
      <HeaderWrapper>
        <TitleWrapper onClick={handleLogoClick}>
          <LogoContainer>
            <Image src={Logo} alt="moodpic" width={82} height={25} loading="eager" priority />
            <Title>Moodpic</Title>
          </LogoContainer>
          <Image src={CaretDownPrimary} alt="메뉴" width={16} height={16} />
        </TitleWrapper>
        {!hasOnlyTitle && (
          <Link href="/search">
            <ATagForA11y>
              <CommonIconButton iconName="magnifyingglass" />
            </ATagForA11y>
          </Link>
        )}
      </HeaderWrapper>
    </>
  );
};

export default Header;

export const ATagForA11y = styled.a`
  display: flex;
`;
