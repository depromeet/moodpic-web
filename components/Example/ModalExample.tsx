import React, { useState } from 'react';
import { CommonDialog } from '@/components/Common';

const ModalExample = () => {
  const [isVisible, setVisible] = useState(false);

  const handleModal = (action: string) => () => {
    if (action === 'open') {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    }
    if (action === 'close') {
      setVisible(false);
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <>
      <button
        style={{ backgroundColor: 'green' }}
        onClick={handleModal('open')}
      >
        modal
      </button>
      {isVisible ? (
        <CommonDialog type="alert" onClose={handleModal('close')} />
      ) : null}
    </>
  );
};

export default ModalExample;
