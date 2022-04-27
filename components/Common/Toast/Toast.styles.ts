import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import theme from '@/styles/theme';
import { Type } from '@/shared/type/global';

export const CustomedToastContainer = styled(ToastContainer)<{
  type: Type;
}>`
  padding: 12px 22px;
  text-align: center;
  & .Toastify__toast {
    display: inline-flex;
    min-height: 40px;
    ${theme.fonts.btn2};
  }
  & .Toastify__toast-theme--light {
    background-color: ${({ type }) => {
      if (type === 'error') return theme.colors.red;
      if (type === 'warning') return theme.colors.primary;
      if (type === 'confirm') return theme.colors.gray3;
    }};
  }
  & .Toastify__toast-body {
    color: ${({ type }) => {
      if (type === 'error') return theme.colors.white;
      if (type === 'warning') return theme.colors.black;
      if (type === 'confirm') return theme.colors.white;
    }};
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
