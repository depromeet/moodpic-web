import React from 'react';
import Image from 'next/image';
import CheckCirclePr from 'public/svgs/CheckCirclePr.svg';
import { BottomSheetFolderListWrap } from './BottomSheetFolderList.styles';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isDefaultFolderSelectedState, postRequestState } from '@/store/postResponse/atom';
import { Folder } from '@/shared/type/folder';

interface BottomSheetFolderListProps {
  folderData: Folder[];
  onClose: () => void;
}

const BottomSheetFolderList = ({ folderData, onClose }: BottomSheetFolderListProps) => {
  const [selectedFolder, setSelectFolder] = useRecoilState(postRequestState);
  const [isDefaultFolderSelected, setIsDefaultFolderSelected] = useRecoilState(isDefaultFolderSelectedState);

  const closeFolerList = (selectedForderId: number) => () => {
    setSelectFolder((prev) => ({ ...prev, folderId: selectedForderId }));
    setIsDefaultFolderSelected(true);
    onClose();
  };

  const renderDefaultFolderOrSelectedFolder = (folderId: number, isDefaultFolder: boolean) => {
    if (isDefaultFolder && !isDefaultFolderSelected) {
      return <Image src={CheckCirclePr} alt="CheckCirclePr" />;
    } else if (folderId === selectedFolder.folderId && isDefaultFolderSelected)
      return <Image src={CheckCirclePr} alt="CheckCirclePr" />;
  };

  return (
    <BottomSheetFolderListWrap>
      {folderData.map(({ folderId, folderName, default: isDefaultFolder }) => (
        <FolderListItemWrap key={folderId} onClick={closeFolerList(folderId)}>
          <IconWrap>{renderDefaultFolderOrSelectedFolder(folderId, isDefaultFolder)}</IconWrap>
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
