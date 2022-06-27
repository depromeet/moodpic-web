import theme from '@/styles/theme';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface ChipButtonProps {
  bgColor?: string;
  category: string;
  children: ReactNode;
}

const ChipButton = ({ bgColor = '#3b3a3a', category, children }: ChipButtonProps): React.ReactElement => {
  return (
    <ChipButtonContainer bgColor={bgColor}>
      <i>
        <Image src={`/category-images/category-${category.toLowerCase()}.png`} alt="" width={35} height={35} />
      </i>
      {children}
    </ChipButtonContainer>
  );
};

const ChipButtonContainer = styled.div<{ bgColor: string }>`
  display: inline-flex;
  align-items: center;
  height: 3.2rem;
  padding: 0 1.2rem 0 0.8rem;
  background-color: ${(props) => props.bgColor};
  border-radius: 0.8rem;
  ${theme.fonts.btn2};
  color: ${theme.colors.white};

  i {
    margin-right: 0.2rem;
    width: 2.2rem;
    height: 2.2rem;
  }
`;

export default ChipButton;
