import React, { useEffect, useState } from 'react';
import { CommonWritingButton } from '@/components/Common';
import { useRouter } from 'next/router';
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
      {isScrollAfterBanner && <CommonWritingButton onClick={goToWritePage} />}
    </>
  );
};

export default FloatingButtonGroup;
