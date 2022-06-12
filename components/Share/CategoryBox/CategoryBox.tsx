import React from 'react';
import { CATEGORY_OPTIONS_INFO } from '../../../shared/constants/share';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import Image from 'next/image';

interface CategoryBoxProps {
  category: keyof typeof CATEGORY_OPTIONS_INFO;
}

const CategoryBox = ({ category }: CategoryBoxProps) => {
  // TODO: 백그라운드 아이콘 적용
  const { categoryIcon, text, color } = CATEGORY_OPTIONS_INFO[category];

  return (
    <Container bgColor={color}>
      <IconWrap>
        <Image src={categoryIcon} alt={`${categoryIcon}`} />
      </IconWrap>
      <CategoryText>{text}</CategoryText>
    </Container>
  );
};

const Container = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 6.3rem;
  border-radius: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1.6rem;
`;

const IconWrap = styled.div`
  display: flex;
  margin-right: 0.8rem;
  width: 1.8rem;
  height: 1.8rem;
`;

const CategoryText = styled.p`
  ${theme.fonts.h5}
`;

export default CategoryBox;
