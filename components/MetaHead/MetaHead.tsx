import React from 'react';

import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import SaGong from '/public/images/404.png';

const MetaHead = ({ title, description }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <title>
        {title}
        {description}
      </title>
      {/*<link rel="icon" href={post.icon} />*/}
      <meta name="description" content={description} />
      <meta name="theme-color" content="#000000" />
      <meta name="og:type" content="article" />
      <meta name="og:title" content={'og:title'} />
      <meta name="og:url" content={'og:url'} />
      <meta name="og:description" content={'og:description'} />
      <meta name="og:image" content={SaGong.src} />
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
