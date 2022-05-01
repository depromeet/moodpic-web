import React from 'react';
import Image from 'next/image';
import {
  FolderContainer,
  FolderName,
  FolderCount,
  EditButton,
  DeleteButton,
  BoxContainer,
  CaptionContainer,
} from './Folder.styles';
import EmptyImage from 'public/images/empty.png';
import TrashIcon from 'public/svgs/trash.svg';
import EditFolderIcon from 'public/svgs/editfolder.svg';

export interface Folder {
  name: string;
  count: number;
  thumbnail: string;
}

export interface FolderProps extends Folder {
  isEditMode?: boolean;
  supportsMultipleLayout?: boolean;
}

const Folder = ({
  name,
  count,
  thumbnail = '',
  isEditMode = false,
}: FolderProps): React.ReactElement => {
  return (
    <FolderContainer>
      <BoxContainer>
        {count === 0 ? (
          <Image src={EmptyImage} alt="기록이 없어요" />
        ) : (
          <Image src={thumbnail || EmptyImage} alt={name} />
        )}
        {isEditMode && (
          <DeleteButton onClick={() => console.log('delete')}>
            <Image src={TrashIcon} alt="삭제" />
          </DeleteButton>
        )}
      </BoxContainer>
      <CaptionContainer>
        {isEditMode && (
          <EditButton onClick={() => console.log('edit')}>
            <Image src={EditFolderIcon} alt="편집" />
          </EditButton>
        )}
        <div>
          <FolderName>{name}</FolderName>
          <FolderCount>{count}</FolderCount>
        </div>
      </CaptionContainer>
    </FolderContainer>
  );
};

export default Folder;
