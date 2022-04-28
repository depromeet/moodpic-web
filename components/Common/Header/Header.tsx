import React from 'react';
import Image from 'next/image';
import { HeaderWrapper, Title, TitleWrapper } from './Header.styles';
import MagnifyingGlassIcon from 'public/svgs/magnifyingglass.svg';
import LeftIcon from 'public/svgs/left.svg';

const Header = () => {
  // TODO: main header 이후 다른 페이지 헤더 작업 예정
  const MainHeader = () => (
    <>
      <TitleWrapper>
        <Title>서비스명</Title>
        <Image src={LeftIcon} alt="메뉴" />
      </TitleWrapper>
      <button>
        <Image src={MagnifyingGlassIcon} alt="검색" />
      </button>
    </>
  );

  return (
    <>
      <HeaderWrapper>
        <MainHeader />
      </HeaderWrapper>
    </>
  );
};

export default Header;
