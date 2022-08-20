import React, { useState } from 'react';
import { Textarea, TextareaContainer } from './TextArea.styles';

export type TextAreaAttributes = Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'onChange'
  | 'onBlur'
  | 'onClick'
  | 'onFocus'
  | 'maxLength'
  | 'minLength'
  | 'placeholder'
  | 'readOnly'
  | 'disabled'
  | 'defaultValue'
>;

export type TextAreaProps = {
  value: string;
  height?: string;
  borderRadius?: string;
} & TextAreaAttributes;

const TextArea = ({
  value,
  onFocus,
  onBlur,
  height = '40rem',
  borderRadius = '1.6rem',
  ...restTextAreaProps
}: TextAreaProps) => {
  // 추후에 포커스 될 때를 위해 추가
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextareaContainer borderRadius={borderRadius} isFocused={isFocused}>
      <Textarea
        value={value}
        height={height}
        onFocus={(event: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        {...restTextAreaProps}
      />
    </TextareaContainer>
  );
};

export default TextArea;
