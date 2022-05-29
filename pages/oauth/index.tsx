import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URL } from '@/shared/constants/auth';

const Login = () => {
  const router = useRouter();

  const goKakaoCallback = async () => {
    const kakaoRedirectURL = `${window.location.origin}${KAKAO_REDIRECT_URL}`;
    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${kakaoRedirectURL}&response_type=code`,
    );
  };

  return (
    <>
      <h1>로그인페이지</h1>
      <KakaoButton onClick={goKakaoCallback}>카카오로그인</KakaoButton>
    </>
  );
};

const KakaoButton = styled.button`
  color: white;
`;

export default Login;
