import theme from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

interface SelectButtonProps {
  emotionList: string[];
  title?: string;
}

const SelectButton = ({ emotionList, title, ...props }: SelectButtonProps) => {
  return (
    <SelectContainer {...props}>
      {title && <h3>{title}</h3>}
      <ButtonContainer>
        {emotionList.map((emotion) => (
          <Button
            color="gray"
            size="medium"
            onClick={() => {
              console.log('asd');
            }}
            key={emotion}
          >
            {emotion}
          </Button>
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
