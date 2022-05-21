import React from 'react';
import Image from 'next/image';
import { CommonBottomSheetContainer } from '@/components/Common';
import BottomSheetFolderList from '@/components/BottomSheetFolderList/BottomSheetFolderList';

import FolderIcon from 'public/svgs/folder.svg';
import useBottomSheet from '@/hooks/useBottomSheet';

const mockResponse = [
  {
    folderId: 1,
    folderName: '폴더명1',
  },
  {
    folderId: 2,
    folderName: '폴더명2',
  },
  {
    folderId: 3,
    folderName: '폴더명3',
  },
  {
    folderId: 4,
    folderName: '폴더명4',
  },
  {
    folderId: 5,
    folderName: '폴더명5',
  },
  {
    folderId: 6,
    folderName: '폴더명6',
  },
  {
    folderId: 7,
    folderName: '폴더명7',
  },
  {
    folderId: 8,
    folderName: '폴더명8',
  },
  {
    folderId: 9,
    folderName: '폴더명9',
  },
];

const BottomSheetExample = () => {
  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } =
    useBottomSheet();
  const folderDataLength = mockResponse.length;

  return (
    <>
      <button
        onClick={() => toggleSheet()}
        style={{ backgroundColor: 'white' }}
      >
        오픈
      </button>
      {isVisibleSheet ? (
        <CommonBottomSheetContainer
          onClose={() => toggleSheet()}
          BottomSheetHeight={calcBottomSheetHeight({
            folderSize: folderDataLength,
          })}
          headerTitle={
            <>
              <Image src={FolderIcon} alt="folderIcon" />
              <div>변경할 폴더를 선택해주세요.</div>
            </>
          }
        >
          <BottomSheetFolderList folderData={mockResponse} />
        </CommonBottomSheetContainer>
      ) : null}
    </>
  );
};

export default BottomSheetExample;
