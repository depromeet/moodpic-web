import theme from '@/styles/theme';
import styled, { css } from 'styled-components';
import { ButtonProps } from './Button';

const buttonColorStyle = (color: string) => {
  switch (color) {
    case 'primary':
      return css`
        color: ${theme.colors.black};
        background-color: ${theme.colors.primary};
      `;

    case 'gray':
      return css`
        color: ${theme.colors.white};
        background-color: ${theme.colors.gray3};
      `;
  }
};

const buttonSizeStyle = (size: string) => {
  switch (size) {
    case 'lg':
      return css`
        width: 100%;
        height: 56px;
        ${theme.fonts.btn1};
      `;

    case 'md':
      return css`
        padding: 0 33px;
        height: 42px;
        ${theme.fonts.btn2};
      `;
  }
};

export const ButtonContainer = styled.button<ButtonProps>`
  border-radius: 14px;

  ${(props) => buttonSizeStyle(props.size || 'lg')};
  ${(props) => buttonColorStyle(props.color || 'primary')};
  ${(props) =>
    props.hasShadow &&
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    `}
`;
