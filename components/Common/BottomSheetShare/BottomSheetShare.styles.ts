import styled from 'styled-components';
import theme from '@/styles/theme';

export const BottomSheetShareWrap = styled.div`
  padding-top: 22px;
  & > div {
    margin: 0 36px;
    padding: 22px 0;
    border-bottom: 1px solid ${theme.colors.gray3};
    ${theme.fonts.h5};
    color: ${theme.colors.white};
    cursor: pointer;
  }
  & > div:last-child {
    margin: 0 36px 58px;
    border-bottom: none;
  }
`;
