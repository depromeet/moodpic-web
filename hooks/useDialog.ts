import { useState } from 'react';
import { useBlockScroll } from './useBlockModal';

const useModal = (initialMode = false) => {
  const [dialogVisible, setDialogVisible] = useState(initialMode);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  useBlockScroll(dialogVisible);

  return { dialogVisible, toggleDialog };
};

export default useModal;
