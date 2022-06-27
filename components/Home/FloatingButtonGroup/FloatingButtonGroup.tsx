import React, { useEffect, useState } from 'react';
import { CommonWritingButton } from '@/components/Common';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import HomeFloatingButton from '@/components/Home/FloatingButton/FloatingButton';

interface FloatingButtonGroupProps {
  hasIncompletedPosts: boolean;
}

const FloatingButtonGroup = ({ hasIncompletedPosts }: FloatingButtonGroupProps) => {
  const [isScrollOnTop, setIsScrollOnTop] = useState(true);
  const [isScrollAfterBanner, setIsScrollAfterBanner] = useState(false);
  const router = useRouter();

  const handleScrollOnTop = () => {
    setIsScrollOnTop(window.scrollY === 0);
  };

  const handleScrollAfterBanner = () => {
    setIsScrollAfterBanner(window.scrollY >= 256);
  };

  useEffect(() => {
    const handleScroll = () => {
      handleScrollOnTop();
      handleScrollAfterBanner();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToWritePage = () => {
    router.push('/write');
  };

  return (
    <>
      {hasIncompletedPosts && <HomeFloatingButton isScrollOnTop={isScrollOnTop} />}
      <FloatingContainer>
        <ButtonContainer>{isScrollAfterBanner && <CommonWritingButton onClick={goToWritePage} />}</ButtonContainer>
      </FloatingContainer>
    </>
  );
};

export const FloatingContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  position: relative;
  max-width: 48rem;
  margin: 0 auto;

  button {
    position: absolute;
    right: 3rem;
    bottom: 4rem;
  }
`;

export default FloatingButtonGroup;
