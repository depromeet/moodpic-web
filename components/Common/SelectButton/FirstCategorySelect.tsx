import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { createPostRequestState } from '@/store/post/atom';
import { a11y } from '@/styles/mixins';
import theme from '@/styles/theme';
import { useFirstCategoryQuery } from '@/hooks/apis/post/useFirstCategoryQuery';
import ANXIOUS from '@/components/Figure/ANXIOUS';
import LETHARGY from '@/components/Figure/LETHARGY';
import DISAPPOINTMENT from '@/components/Figure/DISAPPOINTMENT';
import SADNESS from '@/components/Figure/SADNESS';
import REGRET from '@/components/Figure/REGRET';
import IRRITATION from '@/components/Figure/IRRITATION';
import DONTKNOW from '@/components/Figure/DONTKNOW';

interface SelectButtonProps {
  title?: string;
}

const FirstCategorySelect = ({ title }: SelectButtonProps) => {
  const [selectedFirstCategory, setFirstCategory] = useRecoilState(createPostRequestState);
  const { data: firstCategory } = useFirstCategoryQuery();

  const onChangeFirstCategoryValue = (categoryName: string) => () => {
    setFirstCategory({ ...selectedFirstCategory, firstCategory: categoryName });
  };

  const renderFirstCategoryFigure = (categoryName: string) => {
    switch (categoryName) {
      case 'LETHARGY':
        return <LETHARGY checked={selectedFirstCategory.firstCategory === categoryName} />;
      case 'DISAPPOINTMENT':
        return <DISAPPOINTMENT checked={selectedFirstCategory.firstCategory === categoryName} />;
      case 'SADNESS':
        return <SADNESS checked={selectedFirstCategory.firstCategory === categoryName} />;
      case 'REGRET':
        return <REGRET checked={selectedFirstCategory.firstCategory === categoryName} />;
      case 'IRRITATION':
        return <IRRITATION checked={selectedFirstCategory.firstCategory === categoryName} />;
      case 'ANXIOUS':
        return <ANXIOUS checked={selectedFirstCategory.firstCategory === categoryName} />;
      case 'DONTKNOW':
        return <DONTKNOW checked={selectedFirstCategory.firstCategory === categoryName} />;
      default:
        return <LETHARGY checked={selectedFirstCategory.firstCategory === categoryName} />;
    }
  };

  if (!firstCategory) return null;

  return (
    <SelectContainer>
      {title && <h3>{title}</h3>}
      <ButtonContainer>
        {firstCategory?.map(({ categoryId, categoryName, description }) => (
          <label key={categoryId}>
            <RadioInput
              type="radio"
              name="emotion"
              onChange={onChangeFirstCategoryValue(categoryName)}
              checked={selectedFirstCategory.firstCategory === categoryName}
            />
            <ButtonWrapper>
              {renderFirstCategoryFigure(categoryName)}
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

const RadioInput = styled.input`
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
