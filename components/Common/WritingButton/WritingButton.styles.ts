import theme from '@/styles/theme';
import styled from 'styled-components';

export const ButtonContainer = styled.button`
  position: fixed;
  right: 12px;
  bottom: 40px;
  width: 60px;
  height: 60px;
  background-color: ${theme.colors.primary};
  border-radius: 50%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;
