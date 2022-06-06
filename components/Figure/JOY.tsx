import React from 'react';
import { FigureProps } from '@/shared/type/figure';
import { SvgWrap } from './Figure.styles';

const JOY = ({ checked }: FigureProps) => {
  return (
    <SvgWrap>
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity={checked ? '1' : '0.15'}>
          <circle cx="27.5007" cy="12.1511" r="12.1511" fill="#121212" />
          <circle cx="27.5007" cy="42.8493" r="12.1511" fill="#121212" />
          <circle cx="12.1511" cy="27.4997" r="12.1511" fill="#121212" />
          <circle cx="42.8484" cy="27.4997" r="12.1511" fill="#121212" />
          <rect x="19.8242" y="19.8252" width="15.3488" height="15.3488" fill="#121212" />
        </g>
      </svg>
    </SvgWrap>
  );
};

export default JOY;
