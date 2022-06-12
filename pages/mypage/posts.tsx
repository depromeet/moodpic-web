import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ReadyForOpen from '@/components/Common/ReadyForOpen/ReadyForOpen';
import { CommonAppBar, CommonIconButton } from '@/components/Common';
import theme from '@/styles/theme';

const Posts = () => {
  const router = useRouter();
  const onClickGoBack = () => {
    router.back();
  };
  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" alt="이전" onClick={onClickGoBack} />
          <CommonAppBarTitle>나의 기록</CommonAppBarTitle>
        </CommonAppBar.Left>
      </CommonAppBar>
      <ReadyForOpen />
    </>
  );
};

export default Posts;

export const CommonAppBarTitle = styled.span`
  ${theme.fonts.h4};
  color: ${theme.colors.white};
`;
