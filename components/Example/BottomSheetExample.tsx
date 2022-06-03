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
    coverImg: '',
    postCount: 0,
  },
  {
    folderId: 2,
    folderName: '폴더명2',
    coverImg: '',
    postCount: 0,
  },
  {
    folderId: 3,
    folderName: '폴더명3',
    coverImg: '',
    postCount: 0,
  },
  {
    folderId: 4,
    folderName: '폴더명4',
    coverImg: '',
    postCount: 0,
  },
  {
    folderId: 5,
    folderName: '폴더명5',
    coverImg: '',
    postCount: 0,
  },
  {
    folderId: 6,
    folderName: '폴더명6',
    coverImg: '',
    postCount: 0,
  },
  {
    folderId: 7,
    folderName: '폴더명7',
    coverImg: '',
    postCount: 0,
  },
  {
    folderId: 8,
    folderName: '폴더명8',
    coverImg: '',
    postCount: 0,
  },
  {
    folderId: 9,
    folderName: '폴더명9',
    coverImg: '',
    postCount: 0,
  },
];

const BottomSheetExample = () => {
  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } = useBottomSheet();
  const folderDataLength = mockResponse.length;

  return (
    <>
      <button onClick={() => toggleSheet()} style={{ backgroundColor: 'white' }}>
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
          <BottomSheetFolderList
            folderData={mockResponse}
            onClose={() => console.log('asd')}
            toggleDialog={() => console.log('toggleDialog')}
          />
        </CommonBottomSheetContainer>
      ) : null}
    </>
  );
};

export default BottomSheetExample;
