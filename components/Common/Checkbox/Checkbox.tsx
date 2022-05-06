import React, { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { a11y } from '@/styles/mixins';
import theme from '@/styles/theme';
import { ReactNode, ChangeEventHandler } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  checked: boolean;
  children?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Checkbox({
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
}: CheckboxProps): JSX.Element {
  return (
    <CheckboxContainer disabled={disabled}>
      <CheckboxInput
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <CheckboxIcon>
        <svg
          className="icon-check-square"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke={checked ? '' : '#A6A6A6'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={checked ? '#ffec3e' : ''}
          />
          <path
            d="M16.125 9.75L10.625 15L7.875 12.375"
            stroke={checked ? '#121212' : '#A6A6A6'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxIcon>
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.label<Pick<CheckboxProps, 'disabled'>>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  ${a11y}
`;

const CheckboxIcon = styled.i`
  display: flex;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
`;

export default Checkbox;
