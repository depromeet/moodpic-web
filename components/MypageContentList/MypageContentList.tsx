import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { CommonDialog, CommonIconButton } from '../Common';
import styled from 'styled-components';
import useDialog from '@/hooks/useDialog';
import theme from '@/styles/theme';
import { ROUTES } from '@/shared/constants/routes';
import DialogWarning from '../Dialog/DialogWarning';
import SorryFace from 'public/svgs/sorryFace.svg';
import Image from 'next/image';

const Version = styled.span`
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: ${theme.colors.gray5};
`;

const MypageContents = [
  {
    leftContent: '나의 기록',
    rightContent: (
      <>
        <CommonIconButton iconName="right" />
      </>
    ),
    path: `${ROUTES.MYPOSTS}`,
  },
  {
    leftContent: '공지사항',
    rightContent: (
      <>
        <CommonIconButton iconName="right" />
      </>
    ),
    path: `${ROUTES.NOTICE}`,
  },
  {
    leftContent: '버전정보',
    rightContent: <Version>v0.0.1</Version>,
    path: '',
  },
  {
    leftContent: '로그아웃',
    rightContent: '',
    path: '',
  },
  {
    leftContent: '회원탈퇴',
    rightContent: (
      <>
        <CommonIconButton iconName="right" />
      </>
    ),
    path: `${ROUTES.WITHDRAW}`,
  },
];

const MypageContentList = () => {
  const router = useRouter();
  const { dialogVisible, toggleDialog } = useDialog();

  const onClickContent = useCallback(
    (content: string, path: string) => () => {
      if (!['로그아웃', '버전정보'].includes(content)) {
        router.push(path);
      } else if (content === '로그아웃') {
        toggleDialog();
      }
    },
    [router, toggleDialog],
  );

  const logout = () => {
    console.log('로그아웃');
    toggleDialog();
  };

  return (
    <>
      <ContentWrapper>
        {MypageContents.map(({ leftContent, rightContent, path }, i) => (
          <ContentWrap key={i} onClick={onClickContent(leftContent, path)}>
            <span>{leftContent}</span>
            <div>{rightContent}</div>
          </ContentWrap>
        ))}
      </ContentWrapper>
      {dialogVisible && (
        <CommonDialog type="alert" confirmText="로그아웃" onClose={toggleDialog} onConfirm={logout}>
          <DialogWarning>
            <DialogContent>
              <span>정말 나가실거에요?</span>
              <Image src={SorryFace} alt="SorryFace" width={22} height={22} />
            </DialogContent>
          </DialogWarning>
        </CommonDialog>
      )}
    </>
  );
};

export default MypageContentList;

const ContentWrapper = styled.span`
  display: flex;
  flex-direction: column;
  & > div:not(:nth-of-type(3)) {
    // 버전정보는 포인터 커서 x
    cursor: pointer;
  }
`;

export const DialogContent = styled.span`
  display: flex;
  align-items: center;
  & > span {
    margin-right: 0.2rem;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4.8rem;
  & > span {
    ${theme.fonts.h4}
    color: ${theme.colors.white};
  }
`;
