import { useEffect, useState } from 'react';

export default function useModal(initialMode = false) {
  const [dialogVisible, setDialogVisible] = useState(initialMode);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  useEffect(() => {
    document.body.style.overflow = dialogVisible ? 'hidden' : 'unset';
  }, [dialogVisible]);

  return { dialogVisible, toggleDialog };
}
