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
      <title>
        {title}
        {description}
      </title>
      {/*<link rel="icon" href={post.icon} />*/}
      <meta property="og:type" content="article" />
      <meta key="title" property="og:title" content={'og:title'} />
      <meta property="og:url" content={'og:url'} />
      <meta key="description" property="og:description" content={'og:description'} />
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
