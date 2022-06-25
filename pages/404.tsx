import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Logo404 from 'public/images/404.png';
import theme from '@/styles/theme';
import { CommonButton } from '@/components/Common';

const Custom404 = () => {
  return (
    <Container>
      <Image src={Logo404} alt="404" height="44" width="108" />
      <BoldText>앗! 페이지를 찾을 수 없어요 😭</BoldText>
      <Description>
        심호흡 한번 깊게 들이쉬고 <br /> 입력하신 주소를 다시 한번 확인해주세요!
      </Description>
      <ButtonContainer>
        <CommonButton>뒤로가기</CommonButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 1.8rem 2.8rem;
`;

const BoldText = styled.strong`
  margin: 3.6rem 0 0.8rem;
  ${theme.fonts.h2};
  color: ${theme.colors.white};
`;

const Description = styled.p`
  text-align: center;
  ${theme.fonts.body};
  color: ${theme.colors.gray5};
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 2.8rem;
  width: calc(100% - 3.6rem);
`;

export default Custom404;
