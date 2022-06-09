import React, { HtmlHTMLAttributes, MouseEvent } from 'react';
import Image from 'next/image';
import { commaNumber } from '@/shared/utils/formatter';
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

export interface FolderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  folderId: number;
  folderName: string;
  count: number;
  coverImage: string;
  isEditMode?: boolean;
  supportsEmptyImg?: boolean;
  onClick: (id: number) => void;
  onEdit?: (id: number, name: string) => void;
  onDelete?: (id: number) => void;
}

const Folder = ({
  folderId,
  count,
  folderName,
  coverImage,
  isEditMode = false,
  supportsEmptyImg = false,
  onClick,
  onEdit,
  onDelete,
}: FolderProps): React.ReactElement => {
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

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
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
      <BoxContainer onClick={handleClick} backgroundImage={!supportsEmptyImg || count !== 0 ? coverImage : ''}>
        {isEditMode && renderDeleteButton()}
      </BoxContainer>
      <CaptionContainer>
        {isEditMode && renderEditButton()}
        <div>
          <FolderName>{folderName}</FolderName>
          <FolderCount>{commaNumber(count)}</FolderCount>
        </div>
      </CaptionContainer>
    </FolderContainer>
  );
};

export default Folder;
