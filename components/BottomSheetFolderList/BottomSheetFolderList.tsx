import React from 'react';
import Image from 'next/image';
import CheckCirclePr from 'public/svgs/CheckCirclePr.svg';
import FolderPlus from 'public/svgs/folderplus.svg';
import { BottomSheetFolderListWrap } from './BottomSheetFolderList.styles';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isDefaultFolderSelectedState, createPostRequestState } from '@/store/post/atom';
import { Folder } from '@/shared/type/folder';
import theme from '@/styles/theme';

interface BottomSheetFolderListProps {
  folderData: Folder[];
  onClose: () => void;
  toggleDialog: () => void;
}

const BottomSheetFolderList = ({ folderData, onClose, toggleDialog }: BottomSheetFolderListProps) => {
  const [selectedFolder, setSelectFolder] = useRecoilState(createPostRequestState);
  const [isDefaultFolderSelected, setIsDefaultFolderSelected] = useRecoilState(isDefaultFolderSelectedState);

  const closeFolerList = (selectedForderId: number) => () => {
    setSelectFolder((prev) => ({ ...prev, folderId: selectedForderId }));
    setIsDefaultFolderSelected(true);
    onClose();
  };

  const renderDefaultFolderOrSelectedFolder = (folderId: number, isDefaultFolder: boolean) => {
    if (
      (isDefaultFolder && !isDefaultFolderSelected) ||
      (folderId === selectedFolder.folderId && isDefaultFolderSelected)
    )
      return <Image src={CheckCirclePr} alt="CheckCirclePr" />;
  };

  return (
    <BottomSheetFolderListWrap>
      {folderData.length === 1 && ( // 미분류만 있을때
        <FolderListItemWrap onClick={toggleDialog}>
          <CustomImage src={FolderPlus} alt="추가" />
          <ButtonText>새로운 폴더 만들기</ButtonText>
        </FolderListItemWrap>
      )}
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

const CustomImage = styled(Image)`
  cursor: pointer;
`;

const ButtonText = styled.span`
  ${theme.fonts.h6};
  color: ${theme.colors.gray4};
  margin-left: 0.8rem;
`;
