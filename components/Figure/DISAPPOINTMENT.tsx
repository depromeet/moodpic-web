import React from 'react';
import { FigureProps } from '@/shared/type/figure';
import { SvgWrap } from './Figure.styles';

const DISAPPOINTMENT = ({ checked }: FigureProps) => {
  return (
    <SvgWrap>
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity={checked ? '1' : '0.15'}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H20.2299V17.069H37.9311V34.7701H54.9994V55H34.7695V37.2989H17.7012V20.2299H0V0Z"
          fill="#121212"
        />
      </svg>
    </SvgWrap>
  );
};

export default DISAPPOINTMENT;
