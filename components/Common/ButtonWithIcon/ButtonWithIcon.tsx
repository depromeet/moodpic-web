import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import ArrowRightPrimary from 'public/svgs/arrow-right-primary.svg';

const ButtonWithIcon = ({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement => {
  return (
    <ButtonContainer {...rest}>
      <Text>{children}</Text>
      <Image src={ArrowRightPrimary} alt="" width={24} height={24} />
    </ButtonContainer>
  );
};

export default ButtonWithIcon;

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.6rem;
  padding: 1.6rem 0;
  background-color: ${theme.colors.gray2};
  border: 0.1rem solid ${theme.colors.primary};
  border-radius: 1rem;

  span {
    ${theme.fonts.btn2};
    color: ${theme.colors.primary};
  }
`;

const Text = styled.span`
  margin-right: 1rem;
`;
