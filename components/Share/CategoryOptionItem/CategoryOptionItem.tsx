import React from 'react';
import { CATEGORY_OPTIONS_INFO } from '../../../shared/constants/share';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import Image from 'next/image';
import CheckIcon from 'public/svgs/check.svg';

interface CategoryOptionItemProps {
  isSelect: boolean;
  category: keyof typeof CATEGORY_OPTIONS_INFO;
  onClick: () => void;
}

const CategoryOptionItem = ({ isSelect, category, onClick }: CategoryOptionItemProps) => {
  const { categoryIcon, text, color } = CATEGORY_OPTIONS_INFO[category];

  return (
    <Container onClick={onClick} bgColor={color}>
      {isSelect && (
        <CheckIconContainer isSelect={isSelect}>
          <Image src={CheckIcon} alt={'checkIcon'} />
        </CheckIconContainer>
      )}
      <CategoryIconContainer>
        <Image src={categoryIcon} alt={'categoryIcon'} />
      </CategoryIconContainer>
      <CategoryText isNotSelect={CATEGORY_OPTIONS_INFO[category] === CATEGORY_OPTIONS_INFO.UNSELECT}>
        {text}
      </CategoryText>
    </Container>
  );
};

const Container = styled.div<{ bgColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.bgColor};
  width: 14rem;
  height: 14rem;
  border-radius: 1rem;
  min-width: auto;
  flex-shrink: 0;
`;

// TODO: 타입 재활용 하기. Pick<CategoryOptionItemProps, 'isSelect'>으로 타입이 잡히지 않는 문제
const CheckIconContainer = styled.div<{ isSelect: boolean }>`
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  top: 0;
  right: 0;
`;

const CategoryIconContainer = styled.div`
  color: ${theme.colors.white};
`;
const CategoryText = styled.p<{ isNotSelect: boolean }>`
  color: ${({ isNotSelect }) => (isNotSelect ? theme.colors.white : theme.colors.black)};
  margin-top: 0.5rem;
  ${theme.fonts.h5}
`;

export default CategoryOptionItem;
