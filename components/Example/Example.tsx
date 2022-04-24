import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import BottomSheetContainer from '@/components/Common/BottomSheetContainer/BottomSheetContainer';
import BottomSheetFolerList from '@/components/Common/BottomSheetFolderList/BottomSheetFolerList';

import FolderIcon from 'public/svgs/folder.svg';
import BottomSheetShare from '../Common/BottomSheetShare/BottomSheetShare';

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
];

const Example = () => {
  const [isVisible, setVisible] = useState(false);

  const folderDataLength = mockResponse.length;

  const calcBottomSheetHeight = () => {
    if (folderDataLength > 7) return 530;
    return 66 + 61.8 * folderDataLength + 58;
  };

  const onClickModal = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return (
    <>
      <button onClick={onClickModal} style={{ backgroundColor: 'white' }}>
        오픈
      </button>
      {isVisible ? (
        <BottomSheetContainer
          onClose={onClickModal}
          BottomSheetHeight={calcBottomSheetHeight()}
        >
          {/* <BottomSheetFolerList folderData={mockResponse} /> */}
          <BottomSheetShare />
        </BottomSheetContainer>
      ) : null}
    </>
  );
};

export default Example;
