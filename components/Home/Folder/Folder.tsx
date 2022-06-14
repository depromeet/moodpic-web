import React, { MouseEvent } from 'react';
import Image from 'next/image';
import { commaNumber } from '@/shared/utils/formatter';
import { Folder } from '@/shared/type/folder';
import {
  FolderContainer,
  FolderName,
  FolderCount,
  EditButton,
  DeleteButton,
  BoxContainer,
  CaptionContainer,
} from './Folder.styles';
import TrashIcon from 'public/svgs/trash.svg';
import EditFolderIcon from 'public/svgs/editfolder.svg';

export interface FolderProps {
  folder: Folder;
  isEditMode?: boolean;
  supportsEmptyImg?: boolean;
  onClick: (id: number) => void;
  onEdit?: (id: number, name: string) => void;
  onDelete?: (id: number) => void;
}

const Folder = ({
  folder,
  isEditMode = false,
  supportsEmptyImg = false,
  onClick,
  onEdit,
  onDelete,
}: FolderProps): React.ReactElement => {
  const { folderId, folderName, postCount, coverImg, default: isDefaultFolder } = folder;

  const handleDelete = (e: MouseEvent<HTMLSpanElement>) => {
    if (!onDelete) return;
    e.stopPropagation();

    onDelete(folderId);
  };

  const handleEdit = (e: MouseEvent<HTMLSpanElement>) => {
    if (!onEdit) return;

    e.stopPropagation();
    onEdit(folderId, folderName);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isEditMode) {
      e.stopPropagation();
      return;
    }

    onClick(folderId);
  };

  const renderDeleteButton = () => {
    if (!onDelete) return;

    return (
      <DeleteButton onClick={handleDelete}>
        <Image src={TrashIcon} alt="삭제" width={32} height={32} />
      </DeleteButton>
    );
  };

  const renderEditButton = () => {
    if (!onEdit) return;

    return (
      <EditButton onClick={handleEdit}>
        <Image src={EditFolderIcon} alt="편집" width={24} height={24} />
      </EditButton>
    );
  };

  return (
    <FolderContainer>
      <BoxContainer onClick={handleClick} backgroundImage={!supportsEmptyImg || postCount !== 0 ? coverImg : ''}>
        {!isDefaultFolder && isEditMode && renderDeleteButton()}
      </BoxContainer>
      <CaptionContainer>
        {!isDefaultFolder && isEditMode && renderEditButton()}
        <div>
          <FolderName>{folderName}</FolderName>
          <FolderCount>{commaNumber(postCount)}</FolderCount>
        </div>
      </CaptionContainer>
    </FolderContainer>
  );
};

export default Folder;
