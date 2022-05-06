import { useState, ChangeEvent } from 'react';

export default function useInput(initialValue: string) {
  const [inputValue, setInputValue] = useState(initialValue);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return { inputValue, onChangeInput };
}
