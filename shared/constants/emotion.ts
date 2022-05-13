import { Dictionary } from '@/shared/type/common';

export const EMOTION_COLOR_TYPE: Dictionary<string> = {
  JOY: '#ffc142',
  PROUD: '#f6f8a5',
  RELIEF: '#b5e76b',
  IRRITATION: '#67d979',
  EASYGOING: '#7bddc0',
  CALMDOWN: '#a7ddff',
  LETHARGY: '#7390f6',
  DISAPPOINTMENT: '#af7dff',
  SADNESS: '#ea84f3',
  REGRET: '#ffaed6',
  ANXIOUS: '#ff7e81',
  DONTKNOW: '#a6a6a6',
} as const;

export type EmotionColorType =
  typeof EMOTION_COLOR_TYPE[keyof typeof EMOTION_COLOR_TYPE];
