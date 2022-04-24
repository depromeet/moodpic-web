import React from 'react';
import { BottomSheetFolerListWrap } from './BottomSheetFolerList.styles';

interface BottomSheetFolerListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  folderData: any;
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
