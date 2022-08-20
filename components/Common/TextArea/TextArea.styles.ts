import styled, { css } from 'styled-components';
import { TextAreaProps } from '@/components/Common/TextArea/TextArea';
import theme from '@/styles/theme';

export const TextareaContainer = styled.div<{ borderRadius: string; isFocused: boolean }>`
  padding: 1.6rem 1.8rem 1.8rem 1.8rem;
  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${theme.colors.gray2};
  box-sizing: border-box;

  ${({ isFocused }) =>
    isFocused &&
    css`
      border: 0.1rem solid ${theme.colors.gray4};
    `}
`;

export const Textarea = styled.textarea<Pick<TextAreaProps, 'height'>>`
  width: 100%;
  height: ${({ height }) => height};
  ${theme.fonts.body}
  color: ${theme.colors.white};
  background: inherit;
  border: 0;
  outline: none;
  resize: none;

  ::placeholder {
    color: ${theme.colors.gray4};
  }

  :disabled {
    -webkit-text-fill-color: ${theme.colors.white};
    opacity: 1;
  }
`;
