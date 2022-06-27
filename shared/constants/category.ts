import { Dictionary } from '@/shared/type/common';

export const EMOTION_TYPE = {
  JOY: 'JOY',
  PROUD: 'PROUD',
  RELIEF: 'RELIEF',
  IRRITATION: 'IRRITATION',
  EASYGOING: 'EASYGOING',
  CALMDOWN: 'CALMDOWN',
  LETHARGY: 'LETHARGY',
  DISAPPOINTMENT: 'DISAPPOINTMENT',
  SADNESS: 'SADNESS',
  REGRET: 'REGRET',
  ANXIOUS: 'ANXIOUS',
  DONTKNOW: 'DONTKNOW',
} as const;

export type EmotionType = typeof EMOTION_TYPE[keyof typeof EMOTION_TYPE];

export const EMOTION_COLOR_TYPE: Dictionary<string> = {
  JOY: '#ffc142',
  PROUD: '#F6F8A5',
  RELIEF: '#B5E76B',
  IRRITATION: '#FFAED6',
  EASYGOING: '#67D979',
  CALMDOWN: '#7BDDC0',
  LETHARGY: '#A7DDFF',
  DISAPPOINTMENT: '#7390F6',
  SADNESS: '#AF7DFF',
  REGRET: '#EA84F3',
  ANXIOUS: '#FF7E81',
  DONTKNOW: '#F2F2F2',
} as const;

export type EmotionColorType = typeof EMOTION_COLOR_TYPE[keyof typeof EMOTION_COLOR_TYPE];
