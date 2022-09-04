import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import { isIOS } from 'react-device-detect';
import { AUTH_TOKEN, KAKAO_CLIENT_ID, KAKAO_CLIENT_ORIGIN, KAKAO_REDIRECT_URL } from '@/shared/constants/auth';
import Image from 'next/image';
import KakaoIcon from 'public/svgs/kakao.svg';
import AppleIcon from 'public/svgs/apple.svg';
import Logo from 'public/svgs/logo.svg';
import { a11y } from '@/styles/mixins';
import theme from '@/styles/theme';
import { hasCookie } from '@/hooks/useCookie';
import { ROUTES } from '@/shared/constants/routes';

const Logos = [
  'ANXIOUS',
  'IRRITATION',
  'REGRET',
  'SADNESS',
  'DISAPPOINTMENT',
  'LETHARGY',
  'CALMDOWN',
  'EASYGOING',
  'RELIEF',
  'PROUD',
  'JOY',
];
const InfiniteScrollingLogos = [...Logos, ...Logos];

const Login = () => {
  const router = useRouter();

  const goKakaoCallback = async () => {
    const kakaoRedirectURL = `${window.location.origin}${KAKAO_REDIRECT_URL}`;
    router.push(
      `${KAKAO_CLIENT_ORIGIN}?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${kakaoRedirectURL}&response_type=code`,
    );
  };

  const goAppleCallback = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).AppleID.auth.init({
      clientId: 'kr.moodpic',
      scope: 'name email',
      redirectURI: 'https://moodpic.kr/oauth/callback/kakao',
      usePopup: true,
    });

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await (window as any).AppleID.auth.signIn();
      console.log(data);
      return data; //doest receive
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    if (hasCookie(AUTH_TOKEN)) {
      router.replace(ROUTES.HOME);
    }
  }, [router]);

  return (
    <LoginWrap>
      <MainTitleWrap>
        <LogoContainer>
          <Image src={Logo} alt="moodpic" width={198} height={64} />
          <Title>Moodpic</Title>
        </LogoContainer>
        <Description>나만의 감정기록 보관소</Description>
      </MainTitleWrap>
      <InfiniteScrollingLogosWrapper>
        <InfiniteScrollingLogosWrap>
          {InfiniteScrollingLogos.map((shapeName, index) => (
            <ImageWrap key={`image__${shapeName}_${index}`}>
              <Image
                src={`/images/${shapeName}_160x160.png`}
                alt={shapeName}
                width={160}
                height={160}
                unoptimized
                loading="eager"
                priority
              />
            </ImageWrap>
          ))}
        </InfiniteScrollingLogosWrap>
      </InfiniteScrollingLogosWrapper>
      <ButtonContainer>
        {isIOS && (
          <AppleLoginButton onClick={goAppleCallback}>
            <Image src={AppleIcon} alt="Apple로 로그인" />
            <span>Apple로 로그인</span>
          </AppleLoginButton>
        )}
        <KakaoButton onClick={goKakaoCallback}>
          <Image src={KakaoIcon} alt="카카오톡으로 로그인" />
          <span>카카오톡으로 로그인</span>
        </KakaoButton>
      </ButtonContainer>
    </LoginWrap>
  );
};

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px); // AppLayout의 padding-bottom: 80px 때문에 100vh가 제대로 안먹어서 빼줌
  touch-action: none;
`;

const MainTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 173px;
`;

const ButtonContainer = styled.div`
  position: sticky;
  left: 0;
  bottom: 8rem;
  margin-top: auto;
  width: 100%;
  padding: 0 1.6rem;
  &::after {
    position: absolute;
    bottom: -8rem;
    left: 0;
    width: 100%;
    height: 21.2rem;
    content: '';
    background: linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #121212 52.6%);
    z-index: -1;
  }

  > button,
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5.5rem;
    margin: 0 auto;
    border-radius: 0.8rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.8rem;
  }

  div ~ button {
    margin-top: 2rem;
  }
`;

const KakaoButton = styled.button`
  color: #341b1c;
  background-color: ${theme.colors.kakao};

  & > span {
    margin-left: 0.7rem;
  }
`;

const AppleLoginButton = styled.div`
  background-color: ${theme.colors.gray7};
  color: ${theme.colors.black};

  div {
    height: 100%;
  }

  span {
    z-index: 100;
    margin-left: 0.7rem;
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  ${a11y};
`;

const Description = styled.h2`
  ${theme.fonts.h3};
  line-height: 2.148rem;
  font-weight: 500;
  color: ${theme.colors.white};
  text-align: center;
`;

const ImageWrap = styled.div`
  flex-shrink: 0;
  width: 16rem;
  height: 16rem;
  margin-right: 4rem;
`;

const RollingAnimation = () => keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-220rem);
  }
`;

const InfiniteScrollingLogosWrapper = styled.div`
  position: absolute;
  top: 35rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
`;

const InfiniteScrollingLogosWrap = styled.div`
  display: flex;
  align-items: center;
  width: 220rem;
  height: 16rem;
  transform: translateX(-8rem);
  animation: ${RollingAnimation} 80000ms linear infinite;
`;

export default Login;
