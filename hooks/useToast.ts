import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { ToastType } from '@/shared/type/global';
import { toastStateAtom } from '@/store/toast/atom';

interface ToastProps {
  type: ToastType;
  message: string;
}

export default function useToast({ type, message }: ToastProps) {
  const setToastType = useSetRecoilState(toastStateAtom);

  useEffect(() => {
    setToastType(type);
  }, [type, setToastType]);

  return () => toast(message);
}
