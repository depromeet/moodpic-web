import React, { useState } from 'react';
import {
  ContainerStyled,
  InputStyled,
  RightSideIconStyled,
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
}

const TextField = ({
  value,
  onFocus,
  onBlur,
  rightSideIcon,
  height = '4rem',
  borderRadius = '1rem',
  ...restTextFieldProps
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <ContainerStyled height={height}>
      <InputStyled
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
        {...restTextFieldProps}
      />
      {rightSideIcon && (
        <RightSideIconStyled
          src={rightSideIcon}
          alt="aside-icon"
          isFocused={isFocused}
        />
      )}
    </ContainerStyled>
  );
};

export default TextField;
