import React, { useState } from 'react';
import {
  Container,
  Input,
  RightSideIcon,
} from '@/components/Common/TextField/TextField.styles';

export type TextFieldAttributes = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'onChange'
  | 'onBlur'
  | 'onClick'
  | 'onFocus'
  | 'maxLength'
  | 'minLength'
  | 'placeholder'
  | 'readOnly'
  | 'disabled'
>;

export interface TextFieldProps extends TextFieldAttributes {
  value: string;
  rightSideIcon?: string;
  height?: string;
  borderRadius?: '1rem' | '0.4rem';
  hasBorder?: boolean;
}

const TextField = ({
  value,
  onFocus,
  onBlur,
  rightSideIcon,
  height,
  borderRadius,
  hasBorder,
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
        {...restTextFieldProps}
      />
      {rightSideIcon && (
        <RightSideIcon
          src={rightSideIcon}
          alt="aside-icon"
          isFocused={isFocused}
        />
      )}
    </Container>
  );
};

export default TextField;
