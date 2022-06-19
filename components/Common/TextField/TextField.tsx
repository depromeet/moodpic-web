import React, { useState } from 'react';
import { Container, Input, Caption, RightSideIcon } from '@/components/Common/TextField/TextField.styles';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  rightSideIcon?: string;
  height?: string;
  borderRadius?: '1rem' | '0.4rem';
  supportsMaxLength?: boolean;
  onClickRightSideIcon?: () => void;
  hasRightSideIcon?: boolean;
}

const TextField = ({
  value,
  onFocus,
  onBlur,
  rightSideIcon,
  height,
  borderRadius,
  maxLength,
  supportsMaxLength = false,
  onClickRightSideIcon,
  hasRightSideIcon = false,
  ...restTextFieldProps
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Container height={height} supportsMaxLength={supportsMaxLength}>
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
          maxLength={maxLength}
          {...restTextFieldProps}
        />
        {rightSideIcon && hasRightSideIcon && (
          <RightSideIcon src={rightSideIcon} alt="aside-icon" isFocused={isFocused} onClick={onClickRightSideIcon} />
        )}
      </Container>
      {supportsMaxLength && (
        <Caption>
          {value.length}/{maxLength}
        </Caption>
      )}
    </>
  );
};

export default TextField;
