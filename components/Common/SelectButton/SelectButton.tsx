import React from 'react';
import styled from 'styled-components';
import { a11y } from '@/styles/mixins';
import theme from '@/styles/theme';

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
          <label key={emotion}>
            {/* TODO: emotion 을 전역으로 가지고 있다가 다음 누를때마다 전달해주기 */}
            <RadioInput
              name="emotion"
              onChange={() => {
                console.log(emotion);
              }}
            />
            <ButtonWrapper>
              <span>{emotion}</span>
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
