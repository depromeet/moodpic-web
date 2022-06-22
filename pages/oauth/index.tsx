import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { KAKAO_CLIENT_ID, KAKAO_CLIENT_ORIGIN, KAKAO_REDIRECT_URL } from '@/shared/constants/auth';
import Image from 'next/image';
import KakaoIcon from 'public/svgs/kakao.svg';
import Logo from 'public/images/logo.png';
import { a11y } from '@/styles/mixins';
import theme from '@/styles/theme';

const Login = () => {
  const router = useRouter();

  const goKakaoCallback = async () => {
    const kakaoRedirectURL = `${window.location.origin}${KAKAO_REDIRECT_URL}`;
    router.push(
      `${KAKAO_CLIENT_ORIGIN}?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${kakaoRedirectURL}&response_type=code`,
    );
  };

  return (
    <>
      <LogoContainer>
        <Image src={Logo} alt="moodpic" width={140} height={42} />
        <Title>Moodpic</Title>
      </LogoContainer>
      <Description>
        감정을 기록하고, <br /> 파악하여 해소해보세요.
      </Description>
      <ButtonContainer>
        <KakaoButton onClick={goKakaoCallback}>
          <i>
            <Image src={KakaoIcon} alt="" />
          </i>
          카카오톡으로 로그인
        </KakaoButton>
      </ButtonContainer>
    </>
  );
};

const ButtonContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 8rem;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 5.5rem;
  padding: 0 1.6rem;
`;

const KakaoButton = styled.button`
  width: 100%;
  max-width: 44.6rem;
  height: 100%;
  margin: 0 auto;
  color: #341b1c;
  background-color: ${theme.colors.kakao};
  border-radius: 0.8rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.8rem;

  i {
    height: 1.8rem;
    margin-right: 0.7rem;
  }
`;

const LogoContainer = styled.div`
  margin: 6rem 0 2.4rem 1.2rem;
`;

const Title = styled.h1`
  ${a11y};
`;

const Description = styled.h2`
  margin-left: 1.2rem;
  ${theme.fonts.subtitle1};
  color: ${theme.colors.white};
`;

export default Login;
