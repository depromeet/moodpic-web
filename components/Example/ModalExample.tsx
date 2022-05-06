import React from 'react';
import { CommonDialog } from '@/components/Common';
import useModal from '@/hooks/useDialog';

const ModalExample = () => {
  const { dialogVisible, toggleDialog } = useModal();

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
