import React from 'react';
import Image from 'next/image';
import theme from '@/styles/theme';
import CheckCirclePr from 'public/svgs/CheckCirclePr.svg';
import FolderPlus from 'public/svgs/folderplus.svg';
import { BottomSheetFolderListWrap } from './BottomSheetFolderList.styles';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { createPostRequestState } from '@/store/post/atom';
import { Folder } from '@/shared/type/folder';

interface BottomSheetFolderListProps {
  folderData: Folder[];
  onClose: () => void;
  toggleDialog: () => void;
}

const BottomSheetFolderList = ({ folderData, onClose, toggleDialog }: BottomSheetFolderListProps) => {
  const [selectedFolder, setSelectFolder] = useRecoilState(createPostRequestState);

  const closeFolerList = (selectedForderId: number) => () => {
    setSelectFolder((prev) => ({ ...prev, folderId: selectedForderId }));
    onClose();
  };

  return (
    <BottomSheetFolderListWrap>
      {folderData.length === 1 && ( // 미분류만 있을때
        <FolderListItemWrap onClick={toggleDialog}>
          <CustomImage src={FolderPlus} alt="추가" />
          <ButtonText>새로운 폴더 만들기</ButtonText>
        </FolderListItemWrap>
      )}
      {folderData
        .map(({ folderId, folderName }) => (
          <FolderListItemWrap key={folderId} onClick={closeFolerList(folderId)}>
            <IconWrap>
              {folderId === selectedFolder.folderId && <Image src={CheckCirclePr} alt="CheckCirclePr" />}
            </IconWrap>
            {folderName}
          </FolderListItemWrap>
        ))
        .reverse()}
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
  margin-right: 0.8rem;
`;

const CustomImage = styled(Image)`
  cursor: pointer;
`;

const ButtonText = styled.span`
  ${theme.fonts.h6};
  color: ${theme.colors.gray4};
  margin-left: 0.8rem;
`;
