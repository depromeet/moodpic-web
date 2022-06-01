import React, { useEffect, useState } from 'react';
import { CommonWritingButton } from '@/components/Common';
import { useRouter } from 'next/router';
import HomeFloatingButton from '@/components/Home/FloatingButton/FloatingButton';

interface FloatingButtonGroupProps {
  hasIncompletedPosts: boolean;
}

const FloatingButtonGroup = ({ hasIncompletedPosts }: FloatingButtonGroupProps) => {
  const [isScrollOnTop, setIsScrollOnTop] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY !== 0) {
        if (!isScrollOnTop) {
          return;
        }

        setIsScrollOnTop(false);
      } else {
        setIsScrollOnTop(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollOnTop]);

  const goToWritePage = () => {
    router.push('/write');
  };

  return (
    <>
      {hasIncompletedPosts && <HomeFloatingButton isScrollOnTop={isScrollOnTop} />}
      {!isScrollOnTop && <CommonWritingButton onClick={goToWritePage} />}
    </>
  );
};

export default FloatingButtonGroup;
