import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { CommonTextField } from '@/components/Common';

interface DialogFolderFormProps {
  isEditMode?: boolean;
  title?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const DialogFolderForm = ({ isEditMode = false, title = '', value, onChange }: DialogFolderFormProps) => {
  const dialogTitle = isEditMode ? '변경할 폴더를' : '새폴더의 이름을';

  return (
    <DialogContainer>
      {title ? <Title>{title}</Title> : <Title>📁 {dialogTitle} 입력해주세요.</Title>}
      <CommonTextField
        placeholder="폴더명 입력"
        borderRadius="0.4rem"
        supportsMaxLength
        maxLength={10}
        value={value}
        onChange={onChange}
        autoFocus
      />
    </DialogContainer>
  );
};

const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.4rem 1.6rem 1.6rem;

  > div {
    width: 100%;
  }
`;

const Title = styled.p`
  ${theme.fonts.h4};
  color: ${theme.colors.white};
  margin-bottom: 2rem;
`;

export default DialogFolderForm;
