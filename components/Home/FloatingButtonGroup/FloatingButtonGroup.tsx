import React, { useEffect, useState } from 'react';
import { CommonWritingButton } from '@/components/Common';
import styled from 'styled-components';
import HomeFloatingButton from '@/components/Home/FloatingButton/FloatingButton';

interface FloatingButtonGroupProps {
  hasIncompletedPosts: boolean;
}

const FloatingButtonGroup = ({ hasIncompletedPosts }: FloatingButtonGroupProps) => {
  const [isScrollOnTop, setIsScrollOnTop] = useState(true);

  const handleScrollOnTop = () => {
    setIsScrollOnTop(window.scrollY === 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      handleScrollOnTop();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {hasIncompletedPosts && <HomeFloatingButton isScrollOnTop={isScrollOnTop} />}
      <FloatingContainer>
        <ButtonContainer>
          <CommonWritingButton />
        </ButtonContainer>
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
