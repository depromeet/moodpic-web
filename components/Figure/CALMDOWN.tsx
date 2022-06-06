import React from 'react';
import { FigureProps } from '@/shared/type/figure';
import { SvgWrap } from './Figure.styles';

const CALMDOWN = ({ checked }: FigureProps) => {
  return (
    <SvgWrap>
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity={checked ? '1' : '0.15'}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36.0248 41.092C43.486 37.7208 48.6782 30.2139 48.6782 21.4943C48.6782 9.62331 39.0549 0 27.1839 0C15.313 0 5.68966 9.62331 5.68966 21.4943C5.68966 30.2139 10.8818 37.7208 18.3431 41.092H0V55H55V41.092H36.0248Z"
          fill="#121212"
        />
      </svg>
    </SvgWrap>
  );
};

export default CALMDOWN;
