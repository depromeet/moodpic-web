import styled from 'styled-components';
import { TextAreaProps } from '@/components/Common/TextArea/TextArea';

export const Textarea = styled.textarea<
  Pick<TextAreaProps, 'height' | 'borderRadius'>
>`
  width: 100%;
  padding: 1.6rem 1.8rem 1.8rem 1.8rem;
  display: inline-block;
  text-align: start;
  cursor: text;
  height: ${({ height }) => height};

  border-radius: ${({ borderRadius }) => borderRadius};
  background: #3a3a3b;
  border: none;

  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.6rem;
  right: 0;

  color: white;
`;
