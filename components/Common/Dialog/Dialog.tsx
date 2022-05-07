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
  children: ReactNode;
  disabledConfirm?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const Dialog = ({
  type = 'modal',
  disabledConfirm = false,
  onConfirm,
  onClose,
  children,
}: DialogProps) => {
  const DialogRef =
    typeof window !== 'undefined' && document.getElementById('root-dialog');

  if (!DialogRef) return null;

  return createPortal(
    <DialogWrapper>
      <DialogDimmed onClick={onClose} />
      <DialogWrap>
        <DialogInner>
          <DialogContent>{children}</DialogContent>
          <DialogBottom>
            <CancelBtn onClick={onClose}>취소</CancelBtn>
            <ActionBtn
              dialogType={type}
              disabled={disabledConfirm}
              onClick={onConfirm}
            >
              {type === 'alert' ? '삭제' : '저장'}
            </ActionBtn>
          </DialogBottom>
        </DialogInner>
      </DialogWrap>
    </DialogWrapper>,
    DialogRef,
  );
};

export default Dialog;
