import React, { MouseEventHandler } from 'react';
import CloseIcon from 'public/svgs/close.svg';
import { ChipButtonContainer, Text, CloseImage } from './ChipButton.styles';

export interface ChipButtonProps {
  canDelete: boolean;
  onDelete: MouseEventHandler<HTMLImageElement>;
  children: React.ReactNode;
}

const ChipButton = ({
  canDelete = false,
  onDelete,
  children,
}: ChipButtonProps): React.ReactElement => {
  return (
    <ChipButtonContainer>
      <Text canDelete={canDelete}>{children}</Text>
      {canDelete && (
        <CloseImage
          src={CloseIcon}
          alt="삭제"
          width={16}
          height={16}
          onClick={onDelete}
        />
      )}
    </ChipButtonContainer>
  );
};

export default ChipButton;
