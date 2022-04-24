import styled from 'styled-components';
import theme from '@/styles/theme';

export const BottomSheetFolerListWrap = styled.div`
  max-height: 464px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  & > div {
    margin: 0 36px;
    padding: 22px 0;
    border-bottom: 1px solid ${theme.colors.gray3};
    ${theme.fonts.h5};
    color: ${theme.colors.white};
    cursor: pointer;
  }
  & > div:first-child {
    padding: 0 0 22px;
  }
  & > div:last-child {
    margin: 0 36px 58px;
    border-bottom: none;
  }
`;
