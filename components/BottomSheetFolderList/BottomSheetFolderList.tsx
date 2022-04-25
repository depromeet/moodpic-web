import React from 'react';
import { BottomSheetFolderListWrap } from './BottomSheetFolderList.styles';

type FolderDataType = { folderId: number; folderName: string };
interface BottomSheetFolderListProps {
  folderData: FolderDataType[];
}

const BottomSheetFolderList = ({ folderData }: BottomSheetFolderListProps) => {
  return (
    <BottomSheetFolderListWrap>
      {folderData.map(({ folderId, folderName }) => (
        <div key={folderId}>{folderName}</div>
      ))}
    </BottomSheetFolderListWrap>
  );
};

export default BottomSheetFolderList;
