import theme from '@/styles/theme';
import styled from 'styled-components';

export const HeaderTitle = styled.h2`
  margin-left: -0.2rem;
  ${theme.fonts.h4};
  color: ${theme.colors.white};
`;

export const BottomController = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 48rem;
  height: 9rem;
  margin-left: -1.8rem;
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.black};
  z-index: 1;
`;

export const BottomButton = styled.button<{ disabled: boolean }>`
  ${theme.fonts.h6};
  padding: 1.8rem 2rem;
  color: ${theme.colors.white};

  &:disabled {
    color: ${theme.colors.gray3};
  }
`;

export const LoadingContainer = styled.div`
  margin: 2rem auto;
`;

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
