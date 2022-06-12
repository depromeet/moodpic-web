import theme from '@/styles/theme';
import styled from 'styled-components';

export const ButtonContainer = styled.button`
  position: fixed;
  right: 1.2rem;
  bottom: 4rem;
  width: 6rem;
  height: 6rem;
  background-color: ${theme.colors.primary};
  border-radius: 50%;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  z-index: 10000;
`;
