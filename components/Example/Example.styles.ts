import styled from 'styled-components';

import theme from '@styles/theme';

export const ExampleWrap = styled.div`
  background-color: ${theme.colors.primary}; // 방법 1
  color: ${({ theme }) => theme.colors.black}; // 방법 2
  width: 400px;
  height: 400px;
`;
