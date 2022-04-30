import React from 'react';
import { BottomSheetFolderListWrap } from './BottomSheetFolderList.styles';

interface Folder {
  folderId: number;
  folderName: string;
}

interface BottomSheetFolderListProps {
  folderData: Folder[];
}

const BottomSheetFolderList = ({ folderData }: BottomSheetFolderListProps) => {
  return (
    <BottomSheetFolderListWrap>
      {folderData.map(({ folderId, folderName }: Folder) => (
        <div key={folderId}>{folderName}</div>
      ))}
    </BottomSheetFolderListWrap>
  );
};

export default BottomSheetFolderList;
