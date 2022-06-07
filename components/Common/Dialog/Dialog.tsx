import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import {
  DialogWrapper,
  DialogWrap,
  DialogInner,
  DialogContent,
  DialogBottom,
  CancelBtn,
  ActionBtn,
  DialogDimmed,
} from './Dialog.styles';

export interface DialogProps {
  type: 'modal' | 'alert';
  customConfirm?: string;
  children: ReactNode;
  disabledConfirm?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const Dialog = ({
  type = 'modal',
  customConfirm,
  disabledConfirm = false,
  onConfirm,
  onClose,
  children,
}: DialogProps) => {
  const DialogRef = typeof window !== 'undefined' && document.getElementById('root-dialog');

  if (!DialogRef) return null;

  const renderDialogActionText = () => {
    if (type === 'alert') return customConfirm || '삭제';
    if (type === 'modal') return customConfirm || '저장';
  };

  return createPortal(
    <DialogWrapper>
      <DialogDimmed onClick={onClose} />
      <DialogWrap>
        <DialogInner>
          <DialogContent>{children}</DialogContent>
          <DialogBottom>
            <CancelBtn onClick={onClose}>취소</CancelBtn>
            <ActionBtn dialogType={type} disabled={disabledConfirm} onClick={onConfirm}>
              {renderDialogActionText()}
            </ActionBtn>
          </DialogBottom>
        </DialogInner>
      </DialogWrap>
    </DialogWrapper>,
    DialogRef,
  );
};

export default Dialog;
