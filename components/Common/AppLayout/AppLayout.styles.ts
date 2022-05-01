import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.main`
  background-color: ${theme.colors.gray6};
`;
export const ContainerInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.black};
  max-width: 480px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 18px;
`;
