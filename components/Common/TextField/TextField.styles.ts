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

const BorderStyle = (hasBorder: boolean) => {
  switch (hasBorder) {
    case true:
      return css`
        border: 0.1rem solid ${theme.colors.gray4};
      `;

    case false:
      return css`
        border: none;
      `;
  }
};

export const Container = styled.div<Pick<TextFieldProps, 'height'>>`
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  height: ${({ height }) => height};
`;

export const Input = styled.input<
  Pick<TextFieldProps, 'borderRadius' | 'hasBorder'>
>`
  text-align: start;
  cursor: text;
  height: 100%;
  width: 100%;
  padding: 0.6rem 4rem 0.6rem 1.4rem;
  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${theme.colors.gray3};
  right: 0;
  color: ${theme.colors.white};
  letter-spacing: -0.01em;
  outline: none;

  ${theme.fonts.body};
  ${(props) => BorderStyle(props.hasBorder)}
`;

export const RightSideIcon = styled.img<{ isFocused: boolean }>`
  position: relative;
  right: 3.5rem;
  cursor: pointer;

  ${(props) => IconStyle(props.isFocused)};
`;
