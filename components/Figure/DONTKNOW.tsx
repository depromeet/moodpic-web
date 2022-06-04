import React from 'react';
import { FigureProps } from '@/shared/type/figure';
import { SvgWrap } from './Figure.styles';

const DONTKNOW = ({ checked }: FigureProps) => {
  return (
    <SvgWrap>
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect opacity={checked ? '1' : '0.15'} width="35" height="35" fill="#121212" />
      </svg>
    </SvgWrap>
  );
};

export default DONTKNOW;
