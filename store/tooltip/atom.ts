import { atom } from 'recoil';

export const tooltipStateAtom = atom<boolean>({
  key: 'tooltipState',
  default: false,
});
