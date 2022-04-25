import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import BottomSheetContainer from '@/components/Common/BottomSheetContainer/BottomSheetContainer';
import BottomSheetFolerList from '@/components/Common/BottomSheetFolderList/BottomSheetFolerList';
import BottomSheetShare from '@/components/Common/BottomSheetShare/BottomSheetShare';

import FolderIcon from 'public/svgs/folder.svg';

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
  const [isVisible, setVisible] = useState(false);

  const folderDataLength = mockResponse.length;

  const calcBottomSheetHeight = () => {
    if (folderDataLength > 7) return 530;
    return 66 + 61.8 * folderDataLength + 58;
  };

  const handleModal = (action: string) => () => {
    if (action === 'open') setVisible(true);
    if (action === 'close') setVisible(false);
  };

  return (
    <>
      <button
        onClick={handleModal('open')}
        style={{ backgroundColor: 'white' }}
      >
        오픈
      </button>
      {isVisible ? (
        <BottomSheetContainer
          onClose={handleModal('close')}
          BottomSheetHeight={calcBottomSheetHeight()}
          headerTitle={
            <>
              <Image src={FolderIcon} alt="folderIcon" />
              <div>변경할 폴더를 선택해주세요.</div>
            </>
          }
        >
          <BottomSheetFolerList folderData={mockResponse} />
          {/* <BottomSheetShare /> */}
        </BottomSheetContainer>
      ) : null}
    </>
  );
};

export default BottomSheetExample;
