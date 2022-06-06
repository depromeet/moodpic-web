import React from 'react';
import { FigureProps } from '@/shared/type/figure';
import { SvgWrap } from './Figure.styles';

const SADNESS = ({ checked }: FigureProps) => {
  return (
    <SvgWrap>
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={checked ? '1' : '0.15'} d="M0 0V26.4423L28.5577 55H55V28.7731L26.2269 0H0Z" fill="#121212" />
      </svg>
    </SvgWrap>
  );
};

export default SADNESS;
