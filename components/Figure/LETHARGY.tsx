import React from 'react';
import { FigureProps } from '@/shared/type/figure';
import { SvgWrap } from './Figure.styles';

const LETHARGY = ({ checked }: FigureProps) => {
  return (
    <SvgWrap>
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity={checked ? '1' : '0.15'}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M55 0H0V30.3448H55V0ZM55 41.092H0V55H55V41.092Z"
          fill="#121212"
        />
      </svg>
    </SvgWrap>
  );
};

export default LETHARGY;
