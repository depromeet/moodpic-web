import React, { HtmlHTMLAttributes } from 'react';
import {
  CollectedFolderContainer,
  Caption,
  FolderName,
  FolderCount,
  BoxContainer,
  FolderImage,
} from './CollectedFolder.styles';
import { Folder } from '@/shared/type/folder';
import { MAX_THUMBNAIL_SIZE } from '@/shared/constants/home';

// TODO: 이후 mocking 추가하면서 알맞는 폴더에 위치할 예정
export interface CollectedFolderProps
  extends HtmlHTMLAttributes<HTMLDivElement> {
  count: number;
  items: Folder[];
}

const CollectedFolder = ({
  count,
  items,
  ...rest
}: CollectedFolderProps): React.ReactElement => {
  return (
    <CollectedFolderContainer {...rest}>
      <BoxContainer>
        {items.slice(0, MAX_THUMBNAIL_SIZE).map((item) => (
          <FolderImage key={item.folderId} thumbnail={item.coverImg} />
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
