import styled, { css } from 'styled-components';
import theme from '@/styles/theme';
import { ToastContainer } from 'react-toastify';

export const CustomedToastContainer = styled(ToastContainer)<{
  showType: 'error' | 'warning';
}>`
  font-size: 14px;
  padding: 12px 22px;
  text-align: center;
  & .Toastify__toast {
    display: inline-flex;
    min-height: 40px;
  }
  & .Toastify__toast-theme--light {
    ${({ showType }) =>
      showType === 'error'
        ? css`
            background-color: ${theme.colors.red};
          `
        : css`
            background-color: ${theme.colors.primary};
          `}
  }
  & .Toastify__toast-body {
    ${({ showType }) =>
      showType === 'error'
        ? css`
            color: ${theme.colors.white};
          `
        : css`
            color: ${theme.colors.black};
          `}
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
