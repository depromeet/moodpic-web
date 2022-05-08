import { atom } from 'recoil';

export const progressStepStateAtom = atom<number>({
  key: 'progressStepState',
  default: 1,
});
