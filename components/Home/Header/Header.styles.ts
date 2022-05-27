import theme from '@/styles/theme';
import styled from 'styled-components';

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

  span {
    transform: rotate(-90deg);
  }
`;

export const Title = styled.h1`
  ${theme.fonts.h3};
  margin-right: 0.5rem;
  color: ${theme.colors.white};
  line-height: 1.8rem;

  span {
    transform: rotate(-90deg);
  }
`;

export const Button = styled.button`
  height: 2.4rem;
`;
