import React, { MouseEventHandler } from 'react';
import CloseIcon from 'public/svgs/close.svg';
import { TagButtonContainer, Text, CloseImage } from './TagButton.styles';

export interface TagButtonProps {
  canDelete?: boolean;
  onDelete?: MouseEventHandler<HTMLImageElement>;
  children: React.ReactNode;
}

const TagButton = ({
  canDelete = false,
  onDelete,
  children,
}: TagButtonProps): React.ReactElement => {
  return (
    <TagButtonContainer>
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
    </TagButtonContainer>
  );
};

export default TagButton;
