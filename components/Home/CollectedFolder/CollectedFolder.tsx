import { MAX_THUMBNAIL_SIZE } from '@/shared/constants/home';
import React, { HtmlHTMLAttributes } from 'react';
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
  items: string[];
}

const CollectedFolder = ({ count, items }: CollectedFolderProps): React.ReactElement => {
  const invalidThumbnails = Array(MAX_THUMBNAIL_SIZE - items.length).fill('');

  return (
    <CollectedFolderContainer>
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
