import styled, { css } from 'styled-components';
import { TextFieldProps } from './TextField';
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

export const ContainerStyled = styled.div<Pick<TextFieldProps, 'height'>>`
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  height: ${({ height }) => height};
`;

export const InputStyled = styled.input<Pick<TextFieldProps, 'borderRadius'>>`
  text-align: start;
  cursor: text;
  height: 100%;
  width: 100%;
  padding: 0.6rem 4rem 0.6rem 1.4rem;

  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${theme.colors.gray3};
  border: none;
  right: 0;
  color: ${theme.colors.white};
  letter-spacing: -0.01em;
  ${theme.fonts.body};
`;

export const RightSideIconStyled = styled.img<{ isFocused: boolean }>`
  position: relative;
  right: 3.5rem;
  cursor: pointer;

  ${(props) => IconStyle(props.isFocused)};
`;
