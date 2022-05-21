import React from 'react';
import Image from 'next/image';
import CheckCirclePr from 'public/svgs/CheckCirclePr.svg';
import { BottomSheetFolderListWrap } from './BottomSheetFolderList.styles';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { postRequestState } from '@/store/postResponse/atom';
import { Folder } from '@/shared/type/folder';

interface BottomSheetFolderListProps {
  folderData: Folder[];
  onClose: () => void;
}

const BottomSheetFolderList = ({
  folderData,
  onClose,
}: BottomSheetFolderListProps) => {
  const [selectedFolder, setSelectFolder] = useRecoilState(postRequestState);
  const closeFolerList = (selectedForderId: number) => () => {
    setSelectFolder({ ...selectedFolder, folderId: selectedForderId });
    onClose();
  };

  return (
    <BottomSheetFolderListWrap>
      {folderData.map(({ folderId, folderName }) => (
        <FolderListItemWrap key={folderId} onClick={closeFolerList(folderId)}>
          <IconWrap>
            {folderId === selectedFolder.folderId && (
              <Image src={CheckCirclePr} alt="CheckCirclePr" />
            )}
          </IconWrap>
          {folderName}
        </FolderListItemWrap>
      ))}
    </BottomSheetFolderListWrap>
  );
};

export default BottomSheetFolderList;

const FolderListItemWrap = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  display: flex;
  margin-right: 8px;
`;
