import React from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

import Folder from 'public/svgs/folder.svg';
import Warning from 'public/svgs/warning.svg';
import {
  DialogWrapper,
  DialogWrap,
  DialogInner,
  DialogContent,
  DialogHeader,
  DialogBottom,
  CancelBtn,
  ActionBtn,
  DialogDimmed,
} from './Dialog.styles';

interface DialogProps {
  onClose: () => void;
  type: 'modal' | 'alert';
}

const Dialog = ({ onClose, type = 'modal' }: DialogProps) => {
  const DialogRef =
    typeof window !== 'undefined' && document.getElementById('root-dialog');

  const closeDialog = () => {
    onClose();
  };

  if (!DialogRef) return null;

  return createPortal(
    <DialogWrapper>
      <DialogDimmed onClick={closeDialog} />
      <DialogWrap>
        <DialogInner className={type === 'alert' ? 'alert' : ''}>
          {type === 'alert' ? (
            <DialogContent className="alert">
              <Image src={Warning} alt="Warning" />
              <div>‘폴더명’ 폴더를 삭제하시겠어요?</div>
            </DialogContent>
          ) : (
            <DialogContent>
              <DialogHeader>
                <Image src={Folder} alt="Folder" />
                <div>새폴더의 이름을 입력해주세요.</div>
              </DialogHeader>
            </DialogContent>
          )}
          <DialogBottom>
            <CancelBtn onClick={closeDialog}>취소</CancelBtn>
            {type === 'alert' ? (
              <ActionBtn className="alert">삭제</ActionBtn>
            ) : (
              <ActionBtn>저장</ActionBtn>
            )}
          </DialogBottom>
        </DialogInner>
      </DialogWrap>
    </DialogWrapper>,
    DialogRef,
  );
};

export default Dialog;
