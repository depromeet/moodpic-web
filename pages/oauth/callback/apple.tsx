import authService from '@/service/apis/authService';
import { ROUTES } from '@/shared/constants/routes';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const AppleAuth = () => {
  const router = useRouter();

  const login = async (appleCode: string) => {
    try {
      await authService.getAppleAuth(appleCode);
      router.push(ROUTES.HOME);
    } catch (error) {
      router.replace(ROUTES.HOME);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.hash.slice(1));
    const searchParam = urlSearchParams.get('id_token');
    if (searchParam) {
      login(searchParam);
    }
  }, []);

  return <div />;
};

export default AppleAuth;
