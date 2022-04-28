import { atom } from 'recoil';
import { Type } from '@/shared/type/global';

export const toastStateAtom = atom<Type>({
  key: 'toastState',
  default: 'error',
});
