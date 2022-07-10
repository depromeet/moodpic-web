import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { CommonButtonWithIcon } from '@/components/Common';

const PostFloatingButton = (): React.ReactElement => {
  const router = useRouter();
  return (
    <ButtonContainer>
      <CommonButtonWithIcon onClick={() => router.push('/')}>홈으로 돌아가기</CommonButtonWithIcon>
    </ButtonContainer>
  );
};

export default PostFloatingButton;

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
