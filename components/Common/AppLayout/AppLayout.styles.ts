import styled from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.main`
  background-color: ${theme.colors.gray2};
`;
export const ContainerInner = styled.div`
  background-color: ${theme.colors.white};
  width: auto;
  max-width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 18px;
`;
