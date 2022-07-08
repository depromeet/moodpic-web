import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { ToastType } from '@/shared/type/common';
import { toastStateAtom } from '@/store/toast/atom';

interface ToastProps {
  type: ToastType;
  message: string;
}

const toastList = new Set();
const MAX_TOAST = 1;

const useToast = () => {
  const [type, setToastType] = useRecoilState(toastStateAtom);

  const showLimitToast = (message: string) => {
    if (toastList.size < MAX_TOAST) {
      const id = toast(message, {
        onClose: () => toastList.delete(id),
      }) as React.ReactText;
      toastList.add(id);
    }
  };

  useEffect(() => {
    setToastType(type);
  }, [type, setToastType]);

  return ({ type, message }: ToastProps) => {
    setToastType(type);
    showLimitToast(message);
  };
};

export default useToast;
