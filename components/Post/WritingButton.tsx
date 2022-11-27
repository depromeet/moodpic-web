import React from 'react';
import styled from 'styled-components';
import { CommonFAB } from '@/components/Common';

const FAB = () => {
  return (
    <FloatingContainer>
      <ButtonContainer>
        <CommonFAB />
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

export default FAB;
