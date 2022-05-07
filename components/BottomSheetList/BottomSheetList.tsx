import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface BottomSheetListProps {
  items: MenuItem[];
}

const BottomSheetList = ({ items }: BottomSheetListProps) => {
  return (
    <BottomSheetListContainer>
      {items.map((item: MenuItem) => (
        <button key={item.label} onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </BottomSheetListContainer>
  );
};

export default BottomSheetList;

const BottomSheetListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2.2rem;

  & > button {
    margin: 0 3.6rem;
    padding: 2.2rem 0;
    border-bottom: 0.1rem solid ${theme.colors.gray3};
    ${theme.fonts.h5};
    color: ${theme.colors.white};
    cursor: pointer;
    text-align: left;
  }

  & > button:last-child {
    margin: 0 3.6rem 5.8rem;
    border-bottom: none;
  }
`;
