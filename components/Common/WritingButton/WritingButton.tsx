import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ButtonContainer } from './WritingButton.styles';
import WritingIcon from 'public/svgs/writing.svg';

const WritingButton = (): React.ReactElement => {
  return (
    <Link href="/write">
      <ButtonContainer>
        <Image src={WritingIcon} alt="기록하기" width={24} height={24} loading="eager" priority />
      </ButtonContainer>
    </Link>
  );
};

export default WritingButton;
