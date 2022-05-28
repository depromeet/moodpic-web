import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useCategoryListQuery } from '@/hooks/apis/post/useCategoryListQuery';
import { postRequestState } from '@/store/postResponse/atom';
import SecondCategorySelectSkeleton from './SecondCategorySelect.skeleton';
import { a11y } from '@/styles/mixins';
import theme from '@/styles/theme';
import JOY from '@/components/Figure/JOY';
import PROUD from '@/components/Figure/PROUD';
import RELIEF from '@/components/Figure/RELIEF';
import EASYGOING from '@/components/Figure/EASYGOING';
import CALMDOWN from '@/components/Figure/CALMDOWN';
import LETHARGY from '@/components/Figure/LETHARGY';
import DISAPPOINTMENT from '@/components/Figure/DISAPPOINTMENT';
import SADNESS from '@/components/Figure/SADNESS';
import REGRET from '@/components/Figure/REGRET';
import IRRITATION from '@/components/Figure/IRRITATION';
import ANXIOUS from '@/components/Figure/ANXIOUS';
import DONTKNOW from '@/components/Figure/DONTKNOW';

interface SelectButtonProps {
  title?: string;
  secondaryCategorytype: 'positive' | 'negative' | 'natural';
}

const SecondCategorySelect = ({ title, secondaryCategorytype = 'positive' }: SelectButtonProps) => {
  const [selectedCurrentCategory, setCurrentCategory] = useRecoilState(postRequestState);
  const { data: categoryList } = useCategoryListQuery();

  const onChangeSecondaryCategoryValue = (categoryName: string) => () => {
    setCurrentCategory({
      ...selectedCurrentCategory,
      secondCategory: categoryName,
    });
  };

  const renderSecondCategoryFigure = (categoryName: string) => {
    switch (categoryName) {
      case 'JOY':
        return <JOY checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'PROUD':
        return <PROUD checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'RELIEF':
        return <RELIEF checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'EASYGOING':
        return <EASYGOING checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'CALMDOWN':
        return <CALMDOWN checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'LETHARGY':
        return <LETHARGY checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'DISAPPOINTMENT':
        return <DISAPPOINTMENT checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'SADNESS':
        return <SADNESS checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'REGRET':
        return <REGRET checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'IRRITATION':
        return <IRRITATION checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'ANXIOUS':
        return <ANXIOUS checked={selectedCurrentCategory.secondCategory === categoryName} />;
      case 'DONTKNOW':
        return <DONTKNOW checked={selectedCurrentCategory.secondCategory === categoryName} />;
      default:
        return <JOY checked={selectedCurrentCategory.secondCategory === categoryName} />;
    }
  };

  return (
    <SelectContainer>
      {title && <h3>{title}</h3>}
      <ButtonContainer>
        {categoryList ? (
          categoryList[secondaryCategorytype].map(({ categoryId, categoryName, description }) => (
            <label key={categoryId}>
              <RadioInput
                type="radio"
                name="emotion"
                onChange={onChangeSecondaryCategoryValue(categoryName)}
                checked={selectedCurrentCategory.secondCategory === categoryName}
              />
              <ButtonWrapper>
                {renderSecondCategoryFigure(categoryName)}
                <span>{description}</span>
              </ButtonWrapper>
            </label>
          ))
        ) : (
          <SecondCategorySelectSkeleton />
        )}
      </ButtonContainer>
    </SelectContainer>
  );
};

export default SecondCategorySelect;

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

export const RadioInput = styled.input`
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
