import union from '/public/svgs/union.svg';
import sorryFace from '/public/svgs/sorryFace.svg';
import reconcile from '/public/svgs/reconcile.svg';
import tiredFace from '/public/svgs/tiredFace.svg';
import empathizeFace from '/public/svgs/empathizeFace.svg';
import disappointedFace from '/public/svgs/disappointedFace.svg';
import thanks from '/public/svgs/thanks.svg';
import theme from '../../styles/theme';

export const CATEGORY: { [key in keyof typeof CATEGORY_OPTIONS_INFO]: string } = {
  UNSELECT: 'unselect',
  SORRY: 'sorry',
  THANKS: 'thanks',
  UNDERSTAND: 'understand',
  RECONCILED: 'reconciled',
  SAD: 'sad',
  TIRED: 'tired',
} as const;

export type Category = typeof CATEGORY[keyof typeof CATEGORY];

export const CATEGORY_OPTIONS_INFO = {
  UNSELECT: { categoryIcon: union, text: '선택안함', color: theme.colors.gray3 },
  SORRY: { categoryIcon: sorryFace, text: '미안해요', color: '#f1ff9d' },
  THANKS: { categoryIcon: thanks, text: '고마워요', color: '#ffa8ec' },
  UNDERSTAND: { categoryIcon: empathizeFace, text: '이해해요', color: '#FFC24D' },
  RECONCILED: { categoryIcon: reconcile, text: '화해해요', color: '#96f18e' },
  SAD: { categoryIcon: disappointedFace, text: '서운해요', color: '#b899ff' },
  TIRED: { categoryIcon: tiredFace, text: '지쳤어요', color: '#a1dbf4' },
};

export type CategoryOptionsInfo = { [key in Category]: { categoryIcon: string; text: string } };
