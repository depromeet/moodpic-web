import React from 'react';
import Image from 'next/image';
import theme from '@/styles/theme';
import CheckCirclePr from 'public/svgs/CheckCirclePr.svg';
import FolderPlus from 'public/svgs/folderplus.svg';
import { BottomSheetFolderListWrap } from './BottomSheetFolderList.styles';
import styled from 'styled-components';
import { Folder } from '@/shared/type/folder';
import { useFormContext, useWatch } from 'react-hook-form';
import { WriteFormValues } from '@/shared/type/post';
import { useBlockScroll } from '@/hooks/useBlockModal';

interface BottomSheetFolderListProps {
  folderData: Folder[];
  onClose: () => void;
  toggleDialog: () => void;
}

const BottomSheetFolderList = ({ folderData, onClose, toggleDialog }: BottomSheetFolderListProps) => {
  const { setValue, control } = useFormContext<WriteFormValues>();
  const currentFolderId = useWatch({
    control,
    name: 'folderId',
  });
  // FIXME: 폴더를 선택하면 overflow: hidden이 강제되어 임시방편으로 해결
  const unBlockScroll = useBlockScroll(true);

  const closeFolerList = (selectedForderId: number) => () => {
    setValue('folderId', selectedForderId);
    onClose();
    unBlockScroll;
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
            <IconWrap>{folderId === currentFolderId && <Image src={CheckCirclePr} alt="CheckCirclePr" />}</IconWrap>
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
