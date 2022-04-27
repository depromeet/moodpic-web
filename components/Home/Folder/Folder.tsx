import React from 'react';
import Image from 'next/image';
import {
  FolderContainer,
  Caption,
  FolderName,
  FolderCount,
} from './Folder.styles';
import EmptyImage from 'public/images/empty.png';

export interface FolderProps {
  name: string;
  count: number;
  thumbnail?: string;
  supportsMultipleLayout?: boolean;
}

const Folder = ({
  name,
  count,
  thumbnail = '',
}: FolderProps): React.ReactElement => {
  return (
    <FolderContainer>
      {count === 0 ? (
        <Image src={EmptyImage} alt="기록이 없어요" />
      ) : (
        <Image src={thumbnail || EmptyImage} alt={name} />
      )}
      <Caption>
        <FolderName>{name}</FolderName>
        <FolderCount>{count}</FolderCount>
      </Caption>
    </FolderContainer>
  );
};

export default Folder;
