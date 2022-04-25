import React, { MouseEventHandler } from 'react';
import { ButtonContainer } from './Button.styles';

export interface ButtonProps {
  children: React.ReactNode;
  hasShadow?: boolean;
  size?: 'lg' | 'md';
  color?: 'primary' | 'gray';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  size,
  color,
  hasShadow,
  onClick,
}: ButtonProps): React.ReactElement => {
  return (
    <ButtonContainer
      onClick={onClick}
      hasShadow={hasShadow}
      size={size}
      color={color}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
