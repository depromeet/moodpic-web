import { ROUTES } from '@/shared/constants/routes';
import { GetServerSideProps } from 'next';
import React from 'react';

const FallbackPage = () => {
  return <div>redirecting..</div>;
};

export default FallbackPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: { destination: ROUTES.HOME, permanent: true },
  };
};
