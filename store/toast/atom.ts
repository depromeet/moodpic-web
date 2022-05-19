import { atom } from 'recoil';
import { ToastType } from '@/shared/type/common';

export const toastStateAtom = atom<ToastType>({
  key: 'toastState',
  default: 'error',
});
