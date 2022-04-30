import { atom } from 'recoil';
import { ToastType } from '@/shared/type/global';

export const toastStateAtom = atom<ToastType>({
  key: 'toastState',
  default: 'error',
});
