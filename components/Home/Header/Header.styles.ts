import styled from 'styled-components';
import { a11y } from '@/styles/mixins';
import theme from '@/styles/theme';

export const HeaderWrapper = styled.header`
  z-index: 101;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.gray1};
  height: 4.4rem;
  padding: 0 1.8rem;
  margin-right: -1.8rem;
  margin-left: -1.8rem;
  background-color: ${theme.colors.black};
`;

export const TitleWrapper = styled.button`
  display: flex;
  align-items: center;
`;

export const LogoContainer = styled.div`
  margin-right: 0.8rem;
`;

export const Title = styled.h1`
  ${a11y};
`;

export const Button = styled.button`
  height: 2.4rem;
`;

export const ButtonWrapper = styled.a`
  display: flex;
  align-items: center;
`;
