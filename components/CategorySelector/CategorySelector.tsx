import React, { ButtonHTMLAttributes } from 'react';
import theme from '@/styles/theme';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { EMOTION_COLOR_TYPE } from '@/shared/constants/category';
import { CategoryListItemResponse } from '@/hooks/apis';

export interface CategorySelectorProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selectedValue: string;
  title: string;
  disabled?: boolean;
  options: CategoryListItemResponse[];
}

const CategorySelector = ({
  selectedValue,
  title,
  options,
  disabled = false,
  ...rest
}: CategorySelectorProps): React.ReactElement => {
  const selectedCategoryDescription = options
    ? options.find((option) => option.categoryName === selectedValue)?.description
    : '';

  return (
    <CategorySelectorContainer disabled={disabled} {...rest}>
      <TextContainer>
        <Title>{title}</Title>
        <Description color={EMOTION_COLOR_TYPE[selectedValue]}>{selectedCategoryDescription}</Description>
      </TextContainer>
      <ImageContainer>
        <Image src={`/category-images/category-${selectedValue}.png`} alt="" width={51} height={51} />
      </ImageContainer>
    </CategorySelectorContainer>
  );
};

const CategorySelectorContainer = styled.button`
  display: inline-flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 6.3rem;
  padding: 1.2rem 1.4rem 1.2rem 2.4rem;
  border-radius: 1.4rem;
  background-color: ${theme.colors.gray2};
  text-align: left;
  color: ${theme.colors.black};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  margin-bottom: 0.6rem;
  ${theme.fonts.caption1};
  color: ${theme.colors.gray6};
`;

const Description = styled.span<{ color: string }>`
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.9rem;
  color: ${(props) => props.color};
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.7rem;
  bottom: 0.6rem;
  width: 5.1rem;
  height: 5.1rem;
`;

export default CategorySelector;
