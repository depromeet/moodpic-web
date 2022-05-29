import { useEffect, useRef, useState } from 'react';

export const useIsMounted = () => {
  const elementRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    elementRef.current = true;

    return () => {
      elementRef.current = false;
    };
  }, []);

  useEffect(() => {
    setIsMounted(elementRef.current);
  }, [isMounted]);

  return isMounted;
};
