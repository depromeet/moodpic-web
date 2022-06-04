import React from 'react';
import { FigureProps } from '@/shared/type/figure';
import { SvgWrap } from './Figure.styles';

const REGRET = ({ checked }: FigureProps) => {
  return (
    <SvgWrap>
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity={checked ? '1' : '0.15'}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.2721 11.0332L19.1621 0L0 11.0632V33.1897L19.1621 44.2529L25.2871 40.7166V55H54.9998V0L38.2721 11.0332Z"
          fill="#121212"
        />
      </svg>
    </SvgWrap>
  );
};

export default REGRET;
