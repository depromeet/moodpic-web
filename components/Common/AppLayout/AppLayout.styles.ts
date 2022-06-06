import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.main`
  background-color: #000;
`;
export const ContainerInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.black};
  max-width: 48rem;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 1.8rem 8rem;
`;
