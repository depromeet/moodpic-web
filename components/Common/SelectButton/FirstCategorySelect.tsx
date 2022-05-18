import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { postResponseState } from '@/store/postResponse/atom';
import { a11y } from '@/styles/mixins';
import theme from '@/styles/theme';
import { useFirstCategoryQuery } from '@/hooks/query/useFirstCategoryQuery';

interface SelectButtonProps {
  title?: string;
}

const FirstCategorySelect = ({ title }: SelectButtonProps) => {
  const [selectedFirstCategory, setFirstCategory] =
    useRecoilState(postResponseState);
  const { data: firstCategory } = useFirstCategoryQuery();

  const onChangeFirstCategoryValue = (categoryName: string) => () => {
    setFirstCategory({ ...selectedFirstCategory, firstCategory: categoryName });
  };

  if (!firstCategory) return null;

  return (
    <SelectContainer>
      {title && <h3>{title}</h3>}
      <ButtonContainer>
        {firstCategory?.map(({ categoryId, categoryName, description }) => (
          <label key={categoryId}>
            <RadioInput
              name="emotion"
              onChange={() => {
                console.log(emotion);
              }}
            />
            <ButtonWrapper>
              <span>{description}</span>
            </ButtonWrapper>
          </label>
        ))}
      </ButtonContainer>
    </SelectContainer>
  );
};

export default FirstCategorySelect;

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
