import React from 'react';
import styled from 'styled-components';
import { CommonButton } from '../Common';

interface CategoryItem {
  id: string;
  label: string;
}

interface BottomSheetCategoryListProps {
  items: CategoryItem[];
  selectedItem: string;
  onClick: (id: string) => void;
}

const BottomSheetCategoryList = ({ items, selectedItem, onClick }: BottomSheetCategoryListProps) => {
  return (
    <BottomSheetListContainer>
      {items.map((item: CategoryItem) => (
        <CommonButton
          key={item.id}
          size="medium"
          color={selectedItem === item.id ? 'primary' : 'gray'}
          onClick={() => onClick(item.id)}
        >
          {item.label}
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
