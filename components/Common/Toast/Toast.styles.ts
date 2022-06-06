import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import theme from '@/styles/theme';
import { ToastType } from '@/shared/type/common';

export const CustomedToastContainer = styled(ToastContainer)<{
  type: ToastType;
}>`
  max-width: 48rem;
  text-align: center;
  &.Toastify__toast-container--top-center {
    margin-top: 9.4rem;
    z-index: 10001;
  }
  & .Toastify__toast {
    display: inline-flex;
    min-height: 4rem;
    width: 31.3rem;
    ${theme.fonts.btn2};
  }
  & .Toastify__toast-theme--light {
    background-color: ${({ type }) => {
      if (type === 'error') return theme.colors.red;
      if (type === 'warning') return theme.colors.primary;
      if (type === 'confirm') return theme.colors.primary;
    }};
  }
  & .Toastify__toast-body {
    color: ${({ type }) => {
      if (type === 'error') return theme.colors.white;
      if (type === 'warning') return theme.colors.black;
      if (type === 'confirm') return '#000';
    }};
    padding: 0 1.2rem;
    & > div {
      display: inline-block;
      text-align: center;
    }
  }

  & .Toastify__close-button {
    display: none;
  }
`;
