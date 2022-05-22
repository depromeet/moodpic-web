import { atom } from 'recoil';

export type QuestionModeStateType = 'myselfQuestion' | 'providedQuestion';

export const questionModeState = atom<QuestionModeStateType>({
  key: 'questionMode',
  default: 'providedQuestion',
});
