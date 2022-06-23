import React from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { dropdownStateAtom } from '@/store/dropdown/atom';
import { HeaderWrapper, TitleWrapper, LogoContainer, Title } from './Header.styles';
import CaretDownPrimary from 'public/svgs/caretdown-primary.svg';
import { useRouter } from 'next/router';
import { CommonIconButton } from '@/components/Common';
import Logo from 'public/images/logo.png';

interface HeaderProps {
  hasOnlyTitle?: boolean;
}

const Header = ({ hasOnlyTitle = false }: HeaderProps) => {
  const router = useRouter();
  const isDropdownOpen = useSetRecoilState<boolean>(dropdownStateAtom);

  const handleButtonClick = () => {
    router.push('/search');
  };

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
        {!hasOnlyTitle && <CommonIconButton iconName="magnifyingglass" onClick={handleButtonClick} />}
      </HeaderWrapper>
    </>
  );
};

export default Header;
