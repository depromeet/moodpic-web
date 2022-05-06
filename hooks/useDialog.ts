import { useState } from 'react';

export default function useModal(initialMode = false) {
  const [dialogVisible, setDialogVisible] = useState(initialMode);

  const toggleDialog = (): void => {
    setDialogVisible(!dialogVisible);
    document.body.style.overflow = dialogVisible ? 'hidden' : 'unset';
    document.body.style.overflow = 'unset';
  };

  return { dialogVisible, toggleDialog };
}
