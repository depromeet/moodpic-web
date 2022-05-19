import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { ToastType } from '@/shared/type/common';
import { toastStateAtom } from '@/store/toast/atom';

interface ToastProps {
  type: ToastType;
  message: string;
}

export default function useToast() {
  const [type, setToastType] = useRecoilState(toastStateAtom);

  useEffect(() => {
    setToastType(type);
  }, [type, setToastType]);

  return ({ type, message }: ToastProps) => {
    setToastType(type);
    toast(message);
  };
}
