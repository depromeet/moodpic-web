import { useEffect, useState } from 'react';

const useModal = (initialMode = false) => {
  const [dialogVisible, setDialogVisible] = useState(initialMode);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  useEffect(() => {
    document.body.style.overflow = dialogVisible ? 'hidden' : 'unset';
  }, [dialogVisible]);

  return { dialogVisible, toggleDialog };
};

export default useModal;
