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
    <CategorySelectorContainer backgroundColor={EMOTION_COLOR_TYPE[selectedValue]} disabled={disabled} {...rest}>
      <Title>{title}</Title>
      <Description backgroundColor={EMOTION_COLOR_TYPE[selectedValue]}>{selectedCategoryDescription}</Description>
      <ImageContainer>
        <Image src={`/svgs/mood-${selectedValue.toLowerCase()}.svg`} alt="" width={64} height={64} />
      </ImageContainer>
    </CategorySelectorContainer>
  );
};

const CategorySelectorContainer = styled.button<{ backgroundColor: string; disabled: boolean }>`
  display: inline-flex;
  position: relative;
  width: 100%;
  border-radius: 1.4rem;
  background-color: ${(props) => props.backgroundColor};
  text-align: left;
  color: ${theme.colors.black};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
`;

const Title = styled.span`
  position: absolute;
  top: 1.2rem;
  left: 2.4rem;
  ${theme.fonts.caption1};
`;

const Description = styled.span<{ backgroundColor: string }>`
  padding: 3.2rem 2.4rem 1.2rem;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.9rem;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  img {
    mix-blend-mode: overlay;
  }
`;

export default CategorySelector;
