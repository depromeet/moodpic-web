import React from 'react';
import { useEffect } from 'react';
import authService from '@/service/apis/authService';
import { useRouter } from 'next/router';
import { ROUTES } from '@/shared/constants/routes';

const KakaoAuth = () => {
  const router = useRouter();

  const login = async (kakaoCode: string) => {
    try {
      await authService.getAuth(kakaoCode);
      router.push(ROUTES.HOME);
    } catch (error) {
      router.replace(ROUTES.HOME);
    }
  };

  // Listen for authorization success.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  document.addEventListener('AppleIDSignInOnSuccess', (event: any) => {
    // Handle successful response.
    alert(event.detail.data);
  });

  // // Listen for authorization failures.
  // /* eslint-disable @typescript-eslint/no-explicit-any */
  document.addEventListener('AppleIDSignInOnFailure', (event: any) => {
    // Handle error.
    alert(event.detail.error);
  });

  useEffect(() => {
    const kakaoCode = new URL(window.location.href).searchParams.get('code');
    if (kakaoCode) {
      login(kakaoCode);
    }
  }, []);

  return <div />;
};

export default KakaoAuth;
