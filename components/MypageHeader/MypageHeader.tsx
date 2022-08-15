import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMemberQuery } from '@/hooks/apis';
import { CommonAppBar, CommonDialog, CommonIconButton } from '@/components/Common';
import useDialog from '@/hooks/useDialog';
import theme from '@/styles/theme';
import EditFolder from 'public/svgs/editfolder.svg';
import DialogFolderForm from '../Dialog/DialogFolderForm';
import useInput from '@/hooks/useInput';
import { useUpdateNickname } from '@/hooks/apis/member/useMemberMutation';

const MypageHeader = () => {
  const router = useRouter();
  const { data: me } = useMemberQuery();
  const [changedName, onChangeName] = useInput('');
  const { dialogVisible, toggleDialog } = useDialog();
  const { mutate: updateNickname } = useUpdateNickname();
  const onClickGoBack = () => {
    router.back();
  };

  const editNickname = () => {
    updateNickname(changedName);
    toggleDialog();
  };

  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" onClick={onClickGoBack} />
        </CommonAppBar.Left>
      </CommonAppBar>
      <ProfileWrap>
        {me ? (
          <>
            <ProfileImageWrap>
              <Image src={me.profileImg} alt="profile-image" layout="fill" objectFit="cover" />
            </ProfileImageWrap>
            <NicknameWrap>
              {me.nickname}
              <EditIconWrap>
                <Image src={EditFolder} alt="edit-folder" onClick={toggleDialog} />
              </EditIconWrap>
            </NicknameWrap>
          </>
        ) : (
          <ProfileImageSkeleton />
        )}
      </ProfileWrap>
      <Divider />
      {dialogVisible && (
        <CommonDialog type="modal" onClose={toggleDialog} disabledConfirm={changedName === ''} onConfirm={editNickname}>
          <DialogFolderForm title="변경할 닉네임을 입력해주세요." value={changedName} onChange={onChangeName} />
        </CommonDialog>
      )}
    </>
  );
};

export default MypageHeader;

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4.6rem;
`;
const ProfileImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  margin: 0.6rem 0 0.7rem;
`;
export const ProfileImageSkeleton = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  margin: 0.6rem 0 0.7rem;
  background-color: white;
`;
export const NicknameWrap = styled.div`
  position: relative;
  ${theme.fonts.h3};
  line-height: 2.2rem;
  color: ${theme.colors.white};
`;
export const Divider = styled.div`
  width: calc(100% + 3.6rem);
  height: 0.5rem;
  background-color: ${theme.colors.gray3};
  transform: translateX(-1.8rem);
`;

const EditIconWrap = styled.div`
  position: absolute;
  top: -1px;
  right: -28px;
  margin-left: 4px !important;
  cursor: pointer;
`;
