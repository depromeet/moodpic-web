import { CategoryListItemResponse } from '@/hooks/apis';
import React from 'react';
import styled from 'styled-components';
import { CommonButton } from '@/components/Common';

interface BottomSheetCategoryListProps {
  items: CategoryListItemResponse[];
  selectedItem: string;
  onClick: (id: string) => void;
}

const BottomSheetCategoryList = ({ items, selectedItem, onClick }: BottomSheetCategoryListProps) => {
  return (
    <BottomSheetListContainer>
      {items.map((item: CategoryListItemResponse) => (
        <CommonButton
          key={item.categoryId}
          size="small"
          color={selectedItem === item.categoryName ? 'primary' : 'gray'}
          onClick={() => onClick(item.categoryName)}
        >
          {item.description}
        </CommonButton>
      ))}
    </BottomSheetListContainer>
  );
};

export default BottomSheetCategoryList;

const BottomSheetListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 3.5rem;
  grid-gap: 1.3rem;
`;
