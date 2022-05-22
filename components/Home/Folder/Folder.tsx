import React, { HtmlHTMLAttributes } from 'react';
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

export interface FolderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  folderName: string;
  count: number;
  coverImage: string;
  isEditMode?: boolean;
  supportsMultipleLayout?: boolean;
  onClick: () => void;
}

const Folder = ({ count, folderName, coverImage, isEditMode = false, onClick }: FolderProps): React.ReactElement => {
  const renderDeleteButton = () => {
    return (
      <DeleteButton onClick={() => console.log('delete')}>
        <Image src={TrashIcon} alt="삭제" width={24} height={24} />
      </DeleteButton>
    );
  };

  const renderEditButton = () => {
    return (
      <EditButton onClick={() => console.log('edit')}>
        <Image src={EditFolderIcon} alt="편집" width={24} height={24} />
      </EditButton>
    );
  };

  return (
    <FolderContainer>
      <BoxContainer onClick={onClick}>
        {count === 0 ? (
          <Image src={EmptyImage} alt="기록이 없어요" layout="fill" objectFit="cover" />
        ) : (
          <Image src={coverImage || EmptyImage} alt={folderName} layout="fill" objectFit="cover" />
        )}
        {isEditMode && renderDeleteButton()}
      </BoxContainer>
      <CaptionContainer>
        {isEditMode && renderEditButton()}
        <div>
          <FolderName>{folderName}</FolderName>
          <FolderCount>{count}</FolderCount>
        </div>
      </CaptionContainer>
    </FolderContainer>
  );
};

export default Folder;
