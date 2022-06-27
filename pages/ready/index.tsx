import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { CommonAppBar, CommonIconButton } from '@/components/Common';
import PersonRunning from 'public/images/person-running.png';

const ReadyForOpen = () => {
  const router = useRouter();
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
      <ReadyForOpenWrapper>
        <span>
          오픈 준비 중입니다 <Image src={PersonRunning} alt="PersonRunning" />
          <br />
        </span>
        <span>얼른 달려갈게요 !</span>
      </ReadyForOpenWrapper>
    </>
  );
};

export default ReadyForOpen;

const ReadyForOpenWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 44.4rem;
  & > span {
    display: flex;
    ${theme.fonts.h4};
    color: ${theme.colors.white};
    &:nth-of-type(2) {
      margin-left: 8px;
    }
  }
`;
