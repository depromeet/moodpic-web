import React from 'react';
import { BottomSheetFolerListWrap } from './BottomSheetFolerList.styles';

type FolderDataType = { folderId: number; folderName: string };
interface BottomSheetFolerListProps {
  folderData: FolderDataType[];
}

const BottomSheetFolerList = ({ folderData }: BottomSheetFolerListProps) => {
  return (
    <BottomSheetFolerListWrap>
      {folderData.map(({ folderId, folderName }) => (
        <div key={folderId}>{folderName}</div>
      ))}
    </BottomSheetFolerListWrap>
  );
};

export default BottomSheetFolerList;
