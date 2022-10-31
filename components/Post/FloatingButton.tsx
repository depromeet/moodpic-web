import React from 'react';
import styled from 'styled-components';
import { CommonButtonWithIcon } from '@/components/Common';
import Link from 'next/link';

const PostFloatingButton = (): React.ReactElement => {
  return (
    <ButtonContainer>
      <Link href="/">
        <ATagForA11y>
          <CommonButtonWithIcon>홈으로 돌아가기</CommonButtonWithIcon>
        </ATagForA11y>
      </Link>
    </ButtonContainer>
  );
};

export default PostFloatingButton;

// FIXME: 네이밍 변경
const ATagForA11y = styled.a`
  display: inline-block;
  width: 100%;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: calc(100% - 3.6rem);
  height: 22.4rem;
  max-width: 44.4rem;
  background: linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #121212 100%);
`;
