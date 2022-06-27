import React from 'react';
import Image from 'next/image';
import Logo from 'public/images/logo.png';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface HeaderProps {
  onClickLogo?: () => void;
}

const Header = ({ onClickLogo }: HeaderProps) => {
  return (
    <>
      <HeaderWrapper>
        <TitleWrapper onClick={onClickLogo}>
          <LogoContainer>
            <Image src={Logo} alt="moodpic" width={82} height={25} loading="eager" priority />
          </LogoContainer>
        </TitleWrapper>
      </HeaderWrapper>
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  z-index: 101;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.gray1};
  height: 4.4rem;
  padding: 0 1.8rem;
  margin-right: -1.8rem;
  margin-left: -1.8rem;
  background-color: ${theme.colors.black};
`;

const TitleWrapper = styled.button`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  cursor: pointer;
  margin-right: 0.8rem;
`;

const Title = styled.h1``;
