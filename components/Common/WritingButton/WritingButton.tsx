import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import { ButtonContainer } from './WritingButton.styles';
import WritingIcon from '@/assets/icons/writing.svg';

export interface WritingButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const WritingButton = ({ onClick }: WritingButtonProps): React.ReactElement => {
  return (
    <ButtonContainer onClick={onClick}>
      <Image src={WritingIcon} alt="기록하기" />
    </ButtonContainer>
  );
};

export default WritingButton;
