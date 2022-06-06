import React from 'react';
import { FigureProps } from '@/shared/type/figure';
import { SvgWrap } from './Figure.styles';

const IRRITATION = ({ checked }: FigureProps) => {
  return (
    <SvgWrap>
      <svg width="53" height="55" viewBox="0 0 53 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity={checked ? '1' : '0.15'}
          d="M26.5 0L30.749 14.423L42.6641 5.25203L37.624 19.418L52.6541 19.002L40.25 27.5L52.6541 35.998L37.624 35.582L42.6641 49.748L30.749 40.577L26.5 55L22.251 40.577L10.3359 49.748L15.376 35.582L0.345945 35.998L12.75 27.5L0.345945 19.002L15.376 19.418L10.3359 5.25203L22.251 14.423L26.5 0Z"
          fill="#121212"
        />
      </svg>
    </SvgWrap>
  );
};

export default IRRITATION;
