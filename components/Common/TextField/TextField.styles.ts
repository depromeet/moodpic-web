import styled, { css } from 'styled-components';
import { TextFieldProps } from '@/components/Common/TextField/TextField';

import theme from '@/styles/theme';

const IconStyle = (isFocused: boolean) => {
  switch (isFocused) {
    case true:
      return css`
        opacity: 1;
      `;

    case false:
      return css`
        opacity: 0.5;
      `;
  }
};

export const Container = styled.div<Pick<TextFieldProps, 'hasRightSideIcon' | 'height'>>`
  display: flex;

  ${({ hasRightSideIcon }) =>
    hasRightSideIcon
      ? css`
          flex-direction: column;
        `
      : css`
          align-items: center;
        `}
  flex: 0 1 auto;
`;

export const Input = styled.input<Pick<TextFieldProps, 'borderRadius' | 'hasBorder' | 'height'>>`
  text-align: start;
  cursor: text;
  height: 100%;
  width: 100%;
  padding: 0.6rem 4rem 0.6rem 1.4rem;
  border-radius: ${({ borderRadius }) => borderRadius || '1rem'};
  background: ${theme.colors.gray3};
  right: 0;
  color: ${theme.colors.white};
  letter-spacing: -0.01em;
  outline: none;
  height: ${({ height }) => height || '4rem'};

  ${theme.fonts.body};
  ${({ hasBorder }) =>
    hasBorder
      ? css`
          border: 0.1rem solid ${theme.colors.gray4};
        `
      : css`
          border: none;
        `};
`;

export const RightSideIcon = styled.img<{ isFocused: boolean }>`
  position: absolute;
  right: 3.5rem;
  cursor: pointer;

  ${(props) => IconStyle(props.isFocused)};
`;

export const Caption = styled.p`
  margin: 0.4rem 0 0 auto;
  ${theme.fonts.caption1};
  color: ${theme.colors.gray4};
`;
