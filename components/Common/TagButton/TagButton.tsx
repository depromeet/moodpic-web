import React, { HtmlHTMLAttributes } from 'react';
import CloseIcon from 'public/svgs/close.svg';
import { TagButtonContainer, Text, CloseImage } from './TagButton.styles';

export interface TagButtonProps extends HtmlHTMLAttributes<HTMLDivElement> {
  canDelete?: boolean;
  children: React.ReactNode;
  exampleTagMode?: boolean;
}

const TagButton = ({
  canDelete = false,
  exampleTagMode = false,
  children,
  ...props
}: TagButtonProps): React.ReactElement => {
  return (
    <TagButtonContainer exampleTagMode={exampleTagMode} {...props}>
      <Text canDelete={canDelete} exampleTagMode={exampleTagMode}>
        {children}
      </Text>
      {canDelete && (
        <CloseImage src={CloseIcon} alt="삭제" width={16} height={16} />
      )}
    </TagButtonContainer>
  );
};

export default TagButton;
