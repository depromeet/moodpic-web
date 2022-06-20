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
  confirmText?: string;
  children: ReactNode;
  disabledConfirm?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const Dialog = ({
  type = 'modal',
  confirmText,
  disabledConfirm = false,
  onConfirm,
  onClose,
  children,
}: DialogProps) => {
  const DialogRef = typeof window !== 'undefined' && document.getElementById('root-dialog');

  if (!DialogRef) return null;

  const renderDialogActionText = () => {
    if (confirmText) return confirmText;
    if (type === 'alert') return '삭제';
    if (type === 'modal') return '저장';
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
