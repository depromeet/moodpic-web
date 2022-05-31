import React from 'react';

const EMOTION_OPTIONS = {
  SORRY: 'sorry',
  THANK: 'thank',
} as const;

type EmotionOptions = typeof EMOTION_OPTIONS[keyof typeof EMOTION_OPTIONS];
type TmpType = { [key in EmotionOptions]: { icon: string; text: string } };

const TMP: TmpType = {
  [EMOTION_OPTIONS.SORRY]: { icon: '~~', text: '미안해요' },
  [EMOTION_OPTIONS.THANK]: { icon: '~~', text: '감사해요' },
}; // 다른 곳으로 넘기기

interface CategoryOptionItemProps {
  isSelect: boolean;
  category: EmotionOptions;
}

const CategoryOptionItem = ({ isSelect, category }: CategoryOptionItemProps) => {
  // const { icon, text } = TMP.category;

  return <div>hello</div>;
};

export default CategoryOptionItem;
