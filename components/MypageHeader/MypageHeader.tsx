import React from 'react';
import { useRouter } from 'next/router';
import { CommonAppBar, CommonIconButton } from '../Common';
import styled from 'styled-components';
import theme from '@/styles/theme';
import Image from 'next/image';
import { useMemberQuery } from '@/hooks/apis';

const MypageHeader = () => {
  const router = useRouter();
  const { data: me } = useMemberQuery();

  const onClickGoBack = () => {
    router.back();
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
            <Nickname>{me.nickname}</Nickname>
          </>
        ) : (
          <ProfileImageSkeleton />
        )}
      </ProfileWrap>
      <Divider />
    </>
  );
};

export default MypageHeader;

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 46px;
`;
const ProfileImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 6px 0 7px;
`;
export const ProfileImageSkeleton = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 6px 0 7px;
  background-color: white;
`;
export const Nickname = styled.div`
  ${theme.fonts.h3};
  line-height: 22px;
  color: ${theme.colors.white};
`;
export const Divider = styled.div`
  width: calc(100% + 36px);
  height: 5px;
  background-color: ${theme.colors.gray3};
  transform: translateX(-18px);
`;
