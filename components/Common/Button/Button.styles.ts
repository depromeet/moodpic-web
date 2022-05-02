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

const borderRadiusStyle = (size: string) => {
  if (size === 'large') {
    return css`
      border-radius: 14px;
    `;
  }

  if (size === 'medium') {
    return css`
      border-radius: 4px;

      &:disabled {
        background-color: ${theme.colors.gray3};
        color: ${theme.colors.white};
      }
    `;
  }

  if (size === 'small') {
    return css`
      border-radius: 4px;

      &:disabled {
        background-color: ${theme.colors.gray3};
        color: ${theme.colors.gray4};
      }
    `;
  }
};

const buttonSizeStyle = (size: string) => {
  switch (size) {
    case 'large':
      return css`
        width: 100%;
        height: 56px;
        ${theme.fonts.btn1};
      `;
    case 'medium':
      return css`
        padding: 0 22px;
        height: 42px;
        ${theme.fonts.btn2};
      `;
    case 'small':
      return css`
        padding: 0 12px;
        height: 36px;
        ${theme.fonts.btn2};
      `;
  }
};

export const ButtonContainer = styled.button<ButtonProps>`
  ${(props) =>
    props.hasBorderRadius && borderRadiusStyle(props.size || 'large')};
  ${(props) => buttonSizeStyle(props.size || 'large')};
  ${(props) => buttonColorStyle(props.color || 'primary')};
  ${(props) =>
    props.hasShadow &&
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    `}
`;
