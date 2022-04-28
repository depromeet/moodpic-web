import React, { MouseEventHandler } from 'react';
import { ButtonContainer } from './Button.styles';

export interface ButtonProps {
  children: React.ReactNode;
  size?: 'large' | 'medium' | 'small';
  color?: 'primary' | 'gray';
  hasShadow?: boolean;
  hasBorderRadius?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  size = 'large',
  color = 'primary',
  hasShadow = false,
  hasBorderRadius = true,
  onClick,
}: ButtonProps): React.ReactElement => {
  return (
    <ButtonContainer
      onClick={onClick}
      size={size}
      color={color}
      hasShadow={hasShadow}
      hasBorderRadius={hasBorderRadius}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
