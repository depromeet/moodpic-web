import styled from 'styled-components';
import theme from '@/styles/theme';

export const BottomSheetFolderListWrap = styled.div`
  max-height: 46.4rem;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  & > div {
    margin: 0 3.6rem;
    padding: 2.2rem 0;
    border-bottom: 0.1rem solid ${theme.colors.gray3};
    ${theme.fonts.h5};
    color: ${theme.colors.white};
    cursor: pointer;
  }
  & > div:first-child {
    padding: 0 0 2.2rem;
  }
  & > div:last-child {
    margin: 0 3.6rem 5.8rem;
    border-bottom: none;
  }
`;
