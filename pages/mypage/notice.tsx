import React from 'react';
import { useRouter } from 'next/router';
import ReadyForOpen from '@/components/Common/ReadyForOpen/ReadyForOpen';
import { CommonAppBar, CommonIconButton } from '@/components/Common';
import { CommonAppBarTitle } from './posts';

const Notice = () => {
  const router = useRouter();
  const onClickGoBack = () => {
    router.back();
  };
  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" onClick={onClickGoBack} />
          <CommonAppBarTitle>공지사항</CommonAppBarTitle>
        </CommonAppBar.Left>
      </CommonAppBar>
      <ReadyForOpen />
    </>
  );
};

export default Notice;
