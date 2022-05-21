import React from 'react';
import { ButtonWrapper, RadioInput } from './SecondCategorySelect';

const categorySkeletonList = [
  {
    categoryId: 6,
  },
  {
    categoryId: 7,
  },
  {
    categoryId: 8,
  },
  {
    categoryId: 9,
  },
];

const SecondCategorySelectSkeleton = (): React.ReactElement => {
  return (
    <>
      {categorySkeletonList.map(({ categoryId }) => (
        <label key={categoryId}>
          <RadioInput name="emotion" />
          <ButtonWrapper />
        </label>
      ))}
    </>
  );
};

export default SecondCategorySelectSkeleton;
