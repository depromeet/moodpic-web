import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { a11y } from '@/styles/mixins';
import theme from '@/styles/theme';
import { FirstCategoryResponse } from '@/hooks/query/useFirstCategoryQuery';

interface SelectButtonProps {
  categoryList: FirstCategoryResponse[];
  setCategoryValue: Dispatch<SetStateAction<string>>;
  title?: string;
}

const SelectButton = ({
  categoryList,
  setCategoryValue,
  title,
  ...props
}: SelectButtonProps) => {
  const onChangeFirstCategoryValue = (categoryName: string) => () => {
    setCategoryValue(categoryName);
  };
  return (
    <SelectContainer {...props}>
      {title && <h3>{title}</h3>}
      <ButtonContainer>
        {categoryList?.map(({ categoryId, categoryName, image, name }) => (
          <label key={categoryId}>
            {/* TODO: emotion 을 전역으로 가지고 있다가 다음 누를때마다 전달해주기 */}
            <RadioInput
              name="emotion"
              onChange={onChangeFirstCategoryValue(categoryName)}
            />
            <ButtonWrapper>
              <span>{name}</span>
            </ButtonWrapper>
          </label>
        ))}
      </ButtonContainer>
    </SelectContainer>
  );
};

export default SelectButton;

const SelectContainer = styled.div`
  margin-bottom: 36px;
  & > h3 {
    margin-bottom: 12px;
    ${theme.fonts.h4};
    color: ${theme.colors.gray6};
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  column-gap: 12px;
  row-gap: 12px;
`;

const RadioInput = styled.input.attrs({ type: 'radio' })`
  color: ${theme.colors.white};
  background-color: ${theme.colors.gray3};
  ${a11y}
`;

export const ButtonWrapper = styled.div`
  position: relative;
  min-width: 9.3rem;
  padding: 0 2.2rem;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 1.4rem;
  cursor: pointer;
  ${theme.fonts.btn2};
  ${RadioInput} ~ & {
    color: ${theme.colors.white};
    background-color: ${theme.colors.gray3};
  }
  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  ${RadioInput}:checked ~ & {
    color: ${theme.colors.black};
    background-color: ${theme.colors.primary};
  }
`;
