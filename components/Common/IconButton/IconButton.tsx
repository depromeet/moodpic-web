import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName:
    | 'arrowright'
    | 'bgplus'
    | 'close'
    | 'editfolder'
    | 'folder'
    | 'folderplus'
    | 'left'
    | 'magnifyingglass'
    | 'more'
    | 'share'
    | 'trash'
    | 'warning'
    | 'whiteadd';
  alt?: string;
}

const Button = ({
  iconName,
  alt = '',
  children,
  ...rest
}: ButtonProps): React.ReactElement => {
  return (
    <ButtonContainer {...rest}>
      <Image src={`/svgs/${iconName}.svg`} alt={alt} width={24} height={24} />
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button``;

export default Button;
