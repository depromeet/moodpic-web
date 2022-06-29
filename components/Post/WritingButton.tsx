import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { CommonWritingButton } from '@/components/Common';

const WritingButton = () => {
  const router = useRouter();
  const goToWritePage = () => router.push('/write');

  return (
    <FloatingContainer>
      <ButtonContainer>
        <CommonWritingButton onClick={goToWritePage} />
      </ButtonContainer>
    </FloatingContainer>
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
    right: 2.4rem;
    bottom: 8rem;
  }
`;

export default WritingButton;
