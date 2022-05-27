import React from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { dropdownStateAtom } from '@/store/dropdown/atom';
import { HeaderWrapper, Title, TitleWrapper } from './Header.styles';
import LeftIcon from 'public/svgs/left.svg';
import { useRouter } from 'next/router';
import { CommonIconButton } from '@/components/Common';

const Header = () => {
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
          <Title>서비스명</Title>
          <Image src={LeftIcon} alt="메뉴" width={16} height={16} />
        </TitleWrapper>
        <CommonIconButton iconName="magnifyingglass" onClick={handleButtonClick} />
      </HeaderWrapper>
    </>
  );
};

export default Header;
