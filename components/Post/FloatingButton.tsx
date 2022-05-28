import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import ArrowRightPrimary from '@/public/svgs/arrow-right-primary.svg';

const Button = ({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement => {
  return (
    <ButtonContainer {...rest}>
      <Text>홈으로 돌아가기</Text>
      <Image src={ArrowRightPrimary} alt="" />
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button`
  position: fixed;
  bottom: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 3.6rem);
  max-width: 44.4rem;
  height: 4.6rem;
  padding: 1.5rem 0;
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
