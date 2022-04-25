import styled from 'styled-components';
import theme from '@/styles/theme';
import { ToastContainer } from 'react-toastify';

export const CustomedToastContainer = styled(ToastContainer)<{
  showType: 'error' | 'warning';
}>`
  font-size: ${theme.fonts.h6};
  padding: 12px 22px;
  text-align: center;
  & .Toastify__toast {
    display: inline-flex;
    min-height: 40px;
  }
  & .Toastify__toast-theme--light {
    background-color: ${({ showType }) =>
      showType === 'error' ? theme.colors.red : theme.colors.primary};
  }
  & .Toastify__toast-body {
    color: ${({ showType }) =>
      showType === 'error' ? theme.colors.white : theme.colors.black};
    padding: 0 12px;
    & > div {
      display: inline-block;
      text-align: center;
    }
  }

  & .Toastify__close-button {
    display: none;
  }
`;
