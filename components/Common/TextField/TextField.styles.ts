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

export const Container = styled.div<Pick<TextFieldProps, 'supportsMaxLength' | 'height'>>`
  height: 4rem;
  display: flex;

  ${({ supportsMaxLength }) =>
    supportsMaxLength
      ? css`
          flex-direction: column;
        `
      : css`
          align-items: center;
        `}
  flex: 0 1 auto;
`;

export const Input = styled.input<Pick<TextFieldProps, 'borderRadius' | 'height' | 'isSearchField'>>`
  text-align: start;
  cursor: text;
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
  border: none;

  :focus {
    border: 0.1rem solid ${theme.colors.gray4};
  }

  ${({ isSearchField }) =>
    isSearchField &&
    css`
      ::-webkit-input-placeholder {
        background-image: url('/svgs/magnifyingglass-opacity.svg');
        background-color: ${theme.colors.gray3};
        background-size: contain;
        background-position: 1px center;
        background-repeat: no-repeat;
        padding-left: 2.5rem;
        text-indent: 0;
      }

      ::-moz-placeholder {
        background-image: url('/svgs/magnifyingglass-opacity.svg');
        background-color: ${theme.colors.gray3};
        background-size: contain;
        background-position: 1px center;
        background-repeat: no-repeat;
        padding-left: 2.5rem;
        text-indent: 0;
      }

      :-moz-placeholder {
        background-image: url('/svgs/magnifyingglass-opacity.svg');
        background-color: ${theme.colors.gray3};
        background-size: contain;
        background-position: 1px center;
        background-repeat: no-repeat;
        padding-left: 2.5rem;
        text-indent: 0;
      }
    `}
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
