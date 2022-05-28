import React, { useState, forwardRef, ForwardedRef } from 'react';
import { Textarea } from './TextArea.styles';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  height?: string;
  borderRadius?: string;
}

const TextArea = (
  { value, onFocus, onBlur, height = '40rem', borderRadius = '1.6rem', ...restTextAreaProps }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) => {
  // 추후에 포커스 될 때를 위해 추가
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Textarea
      ref={ref}
      value={value}
      borderRadius={borderRadius}
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
  );
};

export default forwardRef(TextArea);
