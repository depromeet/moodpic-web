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
  switch (size) {
    case 'small':
      return css`
        border-radius: 0.4rem;

        &:disabled {
          background-color: ${theme.colors.gray3};
          color: ${theme.colors.gray4};
        }
      `;
    case 'medium':
      return css`
        border-radius: 1rem;

        &:disabled {
          background-color: ${theme.colors.gray3};
          color: ${theme.colors.white};
        }
      `;
    case 'large':
    default:
      return css`
        border-radius: 1.4rem;

        &:disabled {
          background-color: ${theme.colors.gray3};
        }
      `;
  }
};

const buttonSizeStyle = (size: string) => {
  switch (size) {
    case 'large':
      return css`
        width: 100%;
        height: 5.6rem;
        ${theme.fonts.btn1};
      `;
    case 'medium':
      return css`
        min-width: 9.3rem;
        padding: 0 2.2rem;
        height: 4.2rem;
        ${theme.fonts.btn2};
      `;
    case 'small':
      return css`
        padding: 0 1.2rem;
        height: 4.2rem;
        ${theme.fonts.btn2};
      `;
  }
};

export const ButtonContainer = styled.button<ButtonProps>`
  ${(props) => props.hasBorderRadius && borderRadiusStyle(props.size || 'large')};
  ${(props) => buttonSizeStyle(props.size || 'large')};
  ${(props) => buttonColorStyle(props.color || 'primary')};
  ${(props) =>
    props.hasShadow &&
    css`
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
    `}
`;
