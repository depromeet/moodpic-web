import { atom } from 'recoil';

export const dropdownStateAtom = atom<boolean>({
  key: 'dropdownState',
  default: false,
});
