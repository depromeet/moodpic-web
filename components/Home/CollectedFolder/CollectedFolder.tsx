import { MAX_THUMBNAIL_SIZE } from '@/shared/constants/home';
import React, { HtmlHTMLAttributes, MouseEvent } from 'react';
import {
  CollectedFolderContainer,
  Caption,
  FolderName,
  FolderCount,
  BoxContainer,
  FolderImage,
} from './CollectedFolder.styles';

export interface CollectedFolderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  count: number;
  isEditMode: boolean;
  items: string[];
  onClick: () => void;
}

const CollectedFolder = ({ count, isEditMode, items, onClick }: CollectedFolderProps): React.ReactElement => {
  const invalidThumbnails = Array(MAX_THUMBNAIL_SIZE - items.length).fill('');

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isEditMode) {
      e.stopPropagation();
      return;
    }

    onClick();
  };

  return (
    <CollectedFolderContainer onClick={handleClick}>
      <BoxContainer>
        {items.map((item, index) => (
          <FolderImage key={index} thumbnail={item} />
        ))}
        {invalidThumbnails.map((_, index) => (
          <FolderImage key={index} />
        ))}
      </BoxContainer>
      <Caption>
        <FolderName>모든 기록</FolderName>
        <FolderCount>{count}</FolderCount>
      </Caption>
    </CollectedFolderContainer>
  );
};

export default CollectedFolder;
