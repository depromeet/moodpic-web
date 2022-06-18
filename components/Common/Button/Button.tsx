import React, { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium' | 'small';
  color?: 'primary' | 'gray' | 'black';
  hasShadow?: boolean;
  hasBorderRadius?: boolean;
}

const Button = ({
  children,
  size = 'large',
  color = 'primary',
  hasShadow = false,
  hasBorderRadius = true,
  ...rest
}: ButtonProps): React.ReactElement => {
  return (
    <ButtonContainer size={size} color={color} hasShadow={hasShadow} hasBorderRadius={hasBorderRadius} {...rest}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
