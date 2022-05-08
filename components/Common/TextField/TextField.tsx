import React, { useState } from 'react';
import {
  Container,
  Input,
  Caption,
  RightSideIcon,
} from '@/components/Common/TextField/TextField.styles';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  rightSideIcon?: string;
  height?: string;
  borderRadius?: '1rem' | '0.4rem';
  hasBorder?: boolean;
  supportsMaxLength?: boolean;
}

const TextField = ({
  value,
  onFocus,
  onBlur,
  rightSideIcon,
  height,
  borderRadius,
  hasBorder,
  maxLength,
  supportsMaxLength = false,
  ...restTextFieldProps
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container height={height}>
      <Input
        value={value}
        borderRadius={borderRadius}
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        hasBorder={hasBorder}
        maxLength={maxLength}
        {...restTextFieldProps}
      />
      {rightSideIcon && (
        <RightSideIcon
          src={rightSideIcon}
          alt="aside-icon"
          isFocused={isFocused}
        />
      )}
      {supportsMaxLength && (
        <Caption>
          {value.length}/{maxLength}
        </Caption>
      )}
    </Container>
  );
};

export default TextField;
