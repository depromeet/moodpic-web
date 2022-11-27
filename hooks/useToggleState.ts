import { useCallback, useState } from 'react';

export const useToggleState = (initialState = false): [boolean, () => void] => {
  const [isVisible, setVisible] = useState(initialState);

  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return [isVisible, toggleVisible];
};
