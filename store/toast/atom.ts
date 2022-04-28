import { atom } from 'recoil';

export const toastStateAtom = atom<boolean>({
  key: 'toastState',
  default: false,
});
