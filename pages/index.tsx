import React from 'react';
import { usePostsQuery } from '@hooks/query';
import Example from '../components/Example/Example';

const Home = () => {
  const posts = usePostsQuery();

  if (posts.isLoading) {
    return <p>Loading</p>;
  }

  return <Example />;
};

if (process.env.NODE_ENV === 'development') {
  if (typeof window === 'undefined') {
    (async () => {
      const { server } = await import('@mocks/server');
      server.listen();
    })();
  } else {
    (async () => {
      const { worker } = await import('@mocks/browser');
      worker.start();
    })();
  }
}

export default Home;
