import React from 'react';

import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import SaGong from '/public/images/404.png';

const MetaHead = ({ title, description }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        property="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <title>{'title-test'}</title>
      <meta property="og:type" content="article" />
      <meta key="og:title" property="og:title" content="안녕하세요." />
      <meta key="og:description" property="og:description" content="디스크립션입니당" />
      <meta property="og:url" content={'og:url'} />
      <meta property="og:image" content={SaGong.src} />
    </Head>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // test
  return {
    props: {
      title: 'tmpTitle',
      description: 'description',
    },
  };
};

export default MetaHead;
