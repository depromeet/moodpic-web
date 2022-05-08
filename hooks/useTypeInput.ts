import { useState, useCallback, ChangeEvent } from 'react';

type onChangeType = (
  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
) => void;

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, handler, setValue] as [string, onChangeType, typeof setValue];
};

export default useInput;
