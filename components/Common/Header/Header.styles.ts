import theme from '@/styles/theme';
import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  z-index: 101;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.gray1};
  height: 44px;
  padding: 0 18px;
  margin-right: -18px;
  margin-left: -18px;
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
  margin-right: 5px;
  color: ${theme.colors.white};
  line-height: 18px;

  span {
    transform: rotate(-90deg);
  }
`;

export const Button = styled.button`
  height: 24px;
`;
