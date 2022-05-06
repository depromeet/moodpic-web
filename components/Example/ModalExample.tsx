import React from 'react';
import { CommonDialog } from '@/components/Common';
import useDialog from '@/hooks/useDialog';

const ModalExample = () => {
  const { dialogVisible, toggleDialog } = useDialog();

  return (
    <>
      <button style={{ backgroundColor: 'green' }} onClick={toggleDialog}>
        modal
      </button>
      {dialogVisible ? (
        <CommonDialog
          type="alert"
          onClose={toggleDialog}
          onConfirm={toggleDialog}
        >
          모달 컨텐츠
        </CommonDialog>
      ) : null}
    </>
  );
};

export default ModalExample;
