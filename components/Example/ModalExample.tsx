import React, { useState } from 'react';
import Modal from '@/components/Common/Dialog/Dialog';

const ModalExample = () => {
  const [isVisible, setVisible] = useState(false);

  const handleModal = (action: string) => () => {
    if (action === 'open') setVisible(true);
    if (action === 'close') setVisible(false);
  };

  return (
    <>
      <button
        style={{ backgroundColor: 'green' }}
        onClick={handleModal('open')}
      >
        modal
      </button>
      {isVisible ? <Modal type="alert" onClose={handleModal('close')} /> : null}
    </>
  );
};

export default ModalExample;
