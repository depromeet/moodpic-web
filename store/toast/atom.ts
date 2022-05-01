import { atom } from 'recoil';
import { ToastType, ProgressStepType } from '@/shared/type/global';

export const toastStateAtom = atom<ToastType>({
  key: 'toastState',
  default: 'error',
});

export const progressStepStateAtom = atom<number>({
  key: 'progressStepState',
  default: 1,
});
