import { atom } from 'recoil';
import { WriteModeType } from '@/shared/type/common';

export const writeModeStateAtom = atom<WriteModeType>({
  key: 'writeMode',
  default: 'diary',
});
