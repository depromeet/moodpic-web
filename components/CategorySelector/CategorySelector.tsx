import theme from '@/styles/theme';
import React, { ChangeEventHandler } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { EMOTION_COLOR_TYPE } from '@/shared/constants/category';

interface SelectOption {
  id: string;
  label: string;
}

export interface CategorySelectorProps {
  selectedValue: string;
  title: string;
  options: SelectOption[];
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const CategorySelector = ({
  selectedValue,
  title,
  options,
  disabled = false,
  onChange,
}: CategorySelectorProps): React.ReactElement => {
  return (
    <CategorySelectorContainer backgroundColor={EMOTION_COLOR_TYPE[selectedValue]} disabled={disabled}>
      <Title>{title}</Title>
      <SelectContainer
        backgroundColor={EMOTION_COLOR_TYPE[selectedValue]}
        disabled={disabled}
        value={selectedValue}
        onChange={onChange}
      >
        {options.map(({ id, label }, index) => {
          return (
            <Option key={index} value={id}>
              {label}
            </Option>
          );
        })}
      </SelectContainer>
      <ImageContainer>
        <Image src={`/svgs/mood-${selectedValue.toLowerCase()}.svg`} alt="" width={64} height={64} />
      </ImageContainer>
      <ArrowIcon width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.5967 5.98584L8.59668 11.9858L2.59668 5.98584"
          stroke="#121212"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </ArrowIcon>
    </CategorySelectorContainer>
  );
};

const CategorySelectorContainer = styled.div<{ backgroundColor: string; disabled: boolean }>`
  display: inline-flex;
  position: relative;
  width: 100%;
  border-radius: 1.4rem;
  background-color: ${(props) => props.backgroundColor};

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
  color: ${theme.colors.black};
`;

const SelectContainer = styled.select<{ backgroundColor: string }>`
  width: 100%;
  padding: 3.2rem 2.4rem 1.2rem;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.9rem;
  border-radius: 1.4rem;
  color: ${theme.colors.black};
  background-color: ${(props) => props.backgroundColor};
  border: none;
  appearance: none;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  img {
    mix-blend-mode: overlay;
  }
`;

const Option = styled.option``;

const ArrowIcon = styled.svg`
  position: absolute;
  right: 3.85rem;
  top: 3rem;
`;

export default CategorySelector;
