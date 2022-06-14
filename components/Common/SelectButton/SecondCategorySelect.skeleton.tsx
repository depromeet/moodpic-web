import React from 'react';
import { ButtonWrapper, RadioInput, SelectButtonProps } from './SecondCategorySelect';

const categorySkeletonList = {
  positive: [
    {
      categoryId: 1,
      categoryName: 'JOY',
      description: '기뻐요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/JOY.png',
    },
    {
      categoryId: 2,
      categoryName: 'PROUD',
      description: '뿌듯해요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/PROUD.png',
    },
    {
      categoryId: 3,
      categoryName: 'RELIEF',
      description: '안도돼요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/RELIEF.png',
    },
    {
      categoryId: 4,
      categoryName: 'EASYGOING',
      description: '홀가분해요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/EASYGOING.png',
    },
    {
      categoryId: 5,
      categoryName: 'CALMDOWN',
      description: '차분해요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/CALMDOWN.png',
    },
  ],
  negative: [
    {
      categoryId: 6,
      categoryName: 'LETHARGY',
      description: '무기력해요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/LETHARGY.png',
    },
    {
      categoryId: 7,
      categoryName: 'DISAPPOINTMENT',
      description: '실망했어요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/DISAPPOINTMENT.png',
    },
    {
      categoryId: 8,
      categoryName: 'SADNESS',
      description: '슬퍼요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/SADNESS.png',
    },
    {
      categoryId: 9,
      categoryName: 'REGRET',
      description: '후회해요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/REGRET.png',
    },
    {
      categoryId: 10,
      categoryName: 'IRRITATION',
      description: '짜증나요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/IRRITATION.png',
    },
    {
      categoryId: 11,
      categoryName: 'ANXIOUS',
      description: '불안해요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/ANXIOUS.png',
    },
  ],
  natural: [
    {
      categoryId: 12,
      categoryName: 'DONTKNOW',
      description: '모르겠어요',
      image: 'https://5gzoo.s3.ap-northeast-2.amazonaws.com/category/DONTKNOW.png',
    },
  ],
};

const SecondCategorySelectSkeleton = ({ secondaryCategorytype }: SelectButtonProps): React.ReactElement => {
  return (
    <>
      {categorySkeletonList[secondaryCategorytype].map(({ categoryId, description }) => (
        <label key={categoryId}>
          <RadioInput type="radio" name="emotion" />
          <ButtonWrapper>
            <span>{description}</span>
          </ButtonWrapper>
        </label>
      ))}
    </>
  );
};

export default SecondCategorySelectSkeleton;
