import React from 'react';
import DialogWarning from './DialogWarning';

const DialogCancel = () => {
  return <DialogWarning description={'작성중인 내용은 삭제됩니다.'}>기록을 취소하시겠어요?</DialogWarning>;
};

export default DialogCancel;
