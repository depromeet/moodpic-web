import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { Type } from '@/shared/type/global';
import { toastStateAtom } from '@/store/toast/atom';

interface IToast {
  type: Type;
  message: string;
}

export default function useToast({ type, message }: IToast) {
  const setToastType = useSetRecoilState(toastStateAtom);

  useEffect(() => {
    setToastType(type);
  }, [type, setToastType]);

  return () => toast(message);
}
