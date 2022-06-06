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

const CollectedFolder = ({ count, items, ...rest }: CollectedFolderProps): React.ReactElement => {
  const validThumbnails = items.map((item, index) => (index < count ? item : ''));

  return (
    <CollectedFolderContainer {...rest}>
      <BoxContainer>
        {validThumbnails.map((item, index) => (
          <FolderImage key={index} thumbnail={item} />
        ))}
      </BoxContainer>
      <Caption>
        <FolderName>모든 폴더</FolderName>
        <FolderCount>{count}</FolderCount>
      </Caption>
    </CollectedFolderContainer>
  );
};

export default CollectedFolder;
