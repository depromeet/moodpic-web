import theme from '@/styles/theme';
import styled from 'styled-components';

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  background-color: ${theme.colors.primary};
  border-radius: 50%;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  &:active {
    background: #e0ce2f;
  }
`;
