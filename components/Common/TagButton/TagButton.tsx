import React, { HtmlHTMLAttributes } from 'react';
import CloseIcon from 'public/svgs/close.svg';
import { TagButtonContainer, Text, CloseImage } from './TagButton.styles';

export interface TagButtonProps extends HtmlHTMLAttributes<HTMLDivElement> {
  canDelete?: boolean;
  children: React.ReactNode;
  exampleTagMode?: boolean;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const TagButton = ({
  canDelete = false,
  exampleTagMode = false,
  children,
  onClick,
  ...props
}: TagButtonProps): React.ReactElement => {
  return (
    <TagButtonContainer exampleTagMode={exampleTagMode} {...props}>
      <Text canDelete={canDelete} exampleTagMode={exampleTagMode}>
        {children}
      </Text>
      {canDelete && (
        <CloseImage
          src={CloseIcon}
          alt="삭제"
          width={16}
          height={16}
          onClick={onClick}
        />
      )}
    </TagButtonContainer>
  );
};

export default TagButton;
