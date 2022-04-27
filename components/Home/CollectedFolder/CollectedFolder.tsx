import React from 'react';
import {
  CollectedFolderContainer,
  Caption,
  FolderName,
  FolderCount,
  BoxContainer,
  FolderImage,
} from './CollectedFolder.styles';
import { MAX_THUMBNAIL_SIZE } from '@/shared/constants/home';

// TODO: 이후 mocking 추가하면서 알맞는 폴더에 위치할 예정
interface Folder {
  name: string;
  count: number;
  thumbnail: string;
}

export interface CollectedFolderProps {
  name: string;
  count: number;
  items: Folder[];
}

const Folder = ({
  name,
  count,
  items,
}: CollectedFolderProps): React.ReactElement => {
  return (
    <CollectedFolderContainer>
      <BoxContainer>
        {items.slice(0, MAX_THUMBNAIL_SIZE).map((item) => (
          <FolderImage key={item.name} thumbnail={item.thumbnail} />
        ))}
      </BoxContainer>
      <Caption>
        <FolderName>{name}</FolderName>
        <FolderCount>{count}</FolderCount>
      </Caption>
    </CollectedFolderContainer>
  );
};

export default Folder;
