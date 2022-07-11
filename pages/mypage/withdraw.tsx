import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useDialog from '@/hooks/useDialog';
import { CommonAppBar, CommonDialog, CommonIconButton, CommonButton } from '@/components/Common';
import DialogWarning from '@/components/Dialog/DialogWarning';
import theme from '@/styles/theme';
import SorryFace from 'public/svgs/sorryFace.svg';
import { CommonAppBarTitle } from './posts';
import { ButtonWrapper } from '@/pages/write';
import { DialogContent } from '@/components/MypageContentList/MypageContentList';
import { useMemberQuery } from '@/hooks/apis';
import { useDeleteUserMutation } from '@/hooks/apis/member/useMemberMutation';
import { ROUTES } from '@/shared/constants/routes';

const MyPageWithdraw = () => {
  const router = useRouter();
  const { dialogVisible, toggleDialog } = useDialog();
  const { data: me } = useMemberQuery();
  const { mutate: deleteUser } = useDeleteUserMutation();

  const onClickGoBack = () => {
    router.back();
  };
  const withdrawal = () => {
    deleteUser();
    toggleDialog();
    router.replace(`${ROUTES.LOGIN}`);
  };

  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" onClick={onClickGoBack} />
          <CommonAppBarTitle>회원탈퇴</CommonAppBarTitle>
        </CommonAppBar.Left>
      </CommonAppBar>
      <Title>
        {me?.nickname ?? '유저'}님,
        <br /> 정말 탈퇴하시겠어요?
      </Title>
      <Description>탈퇴 시 기록해왔던 모든 정보가 삭제되고 복구할 수 없어요.</Description>
      <ButtonWrapper>
        <CommonButton color="primary" onClick={toggleDialog} size="large">
          탈퇴하기
        </CommonButton>
      </ButtonWrapper>
      {dialogVisible && (
        <CommonDialog type="alert" confirmText="확인" onClose={toggleDialog} onConfirm={withdrawal}>
          <DialogWarning>
            <DialogContent>
              <span>정말 탈퇴하실거에요?</span>
              <Image src={SorryFace} alt="SorryFace" width={22} height={22} />
            </DialogContent>
          </DialogWarning>
        </CommonDialog>
      )}
    </>
  );
};

export default MyPageWithdraw;

const Title = styled.div`
  ${theme.fonts.subtitle1};
  color: ${theme.colors.white};
  margin-top: 5.4rem;
`;
const Description = styled.div`
  ${theme.fonts.body};
  color: ${theme.colors.white};
  margin-top: 1rem;
`;
