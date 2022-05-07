import theme from '@/styles/theme';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface ChipButtonProps {
  bgColor?: string;
  children: ReactNode;
}

const ChipButton = ({
  bgColor = theme.colors.gray3,
  children,
}: ChipButtonProps): React.ReactElement => {
  return (
    <ChipButtonContainer bgColor={bgColor}>{children}</ChipButtonContainer>
  );
};

const ChipButtonContainer = styled.div<{ bgColor: string }>`
  display: inline-flex;
  align-items: center;
  height: 3.2rem;
  padding: 0 1.6rem;
  background-color: ${(props) => props.bgColor};
  border-radius: 1rem;
  ${theme.fonts.h4};
  color: ${theme.colors.white};
`;

export default ChipButton;
