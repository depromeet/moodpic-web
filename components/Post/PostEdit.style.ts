import styled from 'styled-components';
import theme from '@/styles/theme';

export const TextButton = styled.button`
  ${theme.fonts.h6};
  color: ${theme.colors.primary};

  &:disabled {
    color: ${theme.colors.gray3};
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  margin: -2.6rem 0 2.4rem;

  div ~ div {
    margin-left: 1.6rem;
  }
`;

export const SpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3.8rem;
`;

export const DimmedText = styled.div``;
