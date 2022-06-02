import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';

const Loading = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    lottie.loadAnimation({
      container: elementRef.current,
      renderer: 'svg',
      autoplay: true,
      animationData: require('./9682-loading-wait.json'),
    });
  }, []);

  if (!elementRef == undefined) return <></>;

  return <LoadingIndicator ref={elementRef} />;
};

const LoadingIndicator = styled.div`
  width: 8rem;
  height: 8rem;
`;

export default Loading;
