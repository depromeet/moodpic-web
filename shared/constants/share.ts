import union from '/public/svgs/union.svg';
import sorryFace from '/public/svgs/sorryFace.svg';
import reconcile from '/public/svgs/reconcile.svg';
import tiredFace from '/public/svgs/tiredFace.svg';
import empathizeFace from '/public/svgs/empathizeFace.svg';
import disappointedFace from '/public/svgs/disappointedFace.svg';
import thanks from '/public/svgs/thanks.svg';
import theme from '../../styles/theme';

export const CATEGORY: { [key in keyof typeof CATEGORY_OPTIONS_INFO]: string } = {
  NOT_SELECT: 'notSelect',
  SORRY: 'sorry',
  THANK: 'thank',
  EMPATHIZE: 'empathize',
  RECONCILE: 'reconcile',
  DISAPPOINTED: 'disappointed',
  TIRED: 'tired',
} as const;

export type Category = typeof CATEGORY[keyof typeof CATEGORY];

export const CATEGORY_OPTIONS_INFO = {
  NOT_SELECT: { categoryIcon: union, text: '선택안함', color: theme.colors.gray3 },
  SORRY: { categoryIcon: sorryFace, text: '미안해요', color: '#ffa8ec' },
  THANK: { categoryIcon: thanks, text: '고마워요', color: '#ffc24d' },
  EMPATHIZE: { categoryIcon: empathizeFace, text: '이해해요', color: '#ffc24d' },
  RECONCILE: { categoryIcon: reconcile, text: '화해해요', color: '#96f18e' },
  DISAPPOINTED: { categoryIcon: disappointedFace, text: '서운해요', color: '#b899ff' },
  TIRED: { categoryIcon: tiredFace, text: '지쳤어요', color: '#a1dbf4' },
};

export type CategoryOptionsInfo = { [key in Category]: { categoryIcon: string; text: string } };
