import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

const DialogCancel = () => {
  return (
    <DialogContainer>
      <Title>기록을 취소하시겠어요?</Title>
      <Description>작성중인 내용은 삭제됩니다.</Description>
    </DialogContainer>
  );
};

const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.6rem;
`;

const Title = styled.p`
  ${theme.fonts.h4};
  color: ${theme.colors.white};
`;

const Description = styled.p`
  margin-top: 1rem;
  ${theme.fonts.btn2};
  color: ${theme.colors.gray5};
`;

export default DialogCancel;
