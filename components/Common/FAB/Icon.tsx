import React from 'react';
import styled, { css } from 'styled-components';

const Svg = styled.svg<{ isVisible: boolean }>`
  transition: transform 0.2s ease-in;
  ${({ isVisible }) =>
    !isVisible &&
    css`
      transform: rotate(45deg);
    `}
`;

const Icon = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      isVisible={isVisible}
    >
      <path
        d="M18.75 5.24998L5.25 18.75"
        stroke="#121212"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 18.75L5.25 5.24998"
        stroke="#121212"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Icon;
