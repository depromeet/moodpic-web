import { useState, ChangeEvent, useCallback } from 'react';

export default function useInput(initialValue: string) {
  const [inputValue, setInputValue] = useState(initialValue);

  const onChangeInput = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    const max = Number(target.getAttribute('maxlength'));

    if (max && target.value.length > max) {
      target.value = target.value.slice(0, max);
    }

    setInputValue(target.value);
  }, []);

  const resetInputValue = () => setInputValue('');

  return { inputValue, onChangeInput, resetInputValue };
}
