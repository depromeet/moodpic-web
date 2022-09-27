import React from 'react';
import { useEffect } from 'react';
import authService from '@/service/apis/authService';
import { useRouter } from 'next/router';
import { ROUTES } from '@/shared/constants/routes';

const KakaoAuth = () => {
  const router = useRouter();

  const login = async (kakaoCode: string) => {
    try {
      await authService.getKakaoAuth(kakaoCode);
      router.push(ROUTES.HOME);
    } catch (error) {
      router.replace(ROUTES.HOME);
    }
  };

  useEffect(() => {
    // Listen for authorization success.
    /* eslint-disable @typescript-eslint/no-explicit-any */
    console.log('apple login');
    document.addEventListener('AppleIDSignInOnSuccess', (event: any) => {
      // Handle successful response.
      console.log(event.detail.data);
    });

    // // Listen for authorization failures.
    // /* eslint-disable @typescript-eslint/no-explicit-any */
    document.addEventListener('AppleIDSignInOnFailure', (event: any) => {
      // Handle error.
      console.log(event.detail.error);
    });

    const kakaoCode = new URL(window.location.href).searchParams.get('code');
    if (kakaoCode) {
      login(kakaoCode);
    }
  }, []);

  return <div />;
};

export default KakaoAuth;
