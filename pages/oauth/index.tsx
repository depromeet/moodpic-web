import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ROUTES } from '../../shared/constants/routes';

const Login = () => {
  const router = useRouter();

  const goKakaoCallback = async () => {
    router.push(ROUTES.KAKAO_AUTH);
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
