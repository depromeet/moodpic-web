import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import { ButtonContainer } from './WritingButton.styles';
import WritingIcon from 'public/svgs/writing.svg';

export interface WritingButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const WritingButton = ({ onClick }: WritingButtonProps): React.ReactElement => {
  return (
    <ButtonContainer onClick={onClick}>
      <Image src={WritingIcon} alt="기록하기" width={24} height={24} loading="eager" priority />
    </ButtonContainer>
  );
};

export default WritingButton;
