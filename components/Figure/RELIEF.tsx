import React from 'react';
import { FigureProps } from '@/shared/type/figure';
import { SvgWrap } from './Figure.styles';

const RELIEF = ({ checked }: FigureProps) => {
  return (
    <SvgWrap>
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity={checked ? '1' : '0.15'}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.3806 18.4714C43.5146 16.5581 46.1485 13.6666 46.1485 10.431C46.1485 4.67013 37.7988 0 27.499 0C17.1992 0 8.84961 4.67013 8.84961 10.431C8.84961 13.6668 11.4837 16.5584 15.618 18.4717C8.54767 20.277 3.79297 23.6442 3.79297 27.5C3.79297 31.4566 8.79951 34.8987 16.1772 36.6667H9.16667C4.10406 36.6667 0 40.7707 0 45.8333C0 50.8959 4.10406 55 9.16667 55H45.8333C50.8959 55 55 50.8959 55 45.8333C55 40.7707 50.8959 36.6667 45.8333 36.6667H38.8225C46.2002 34.8987 51.2068 31.4566 51.2068 27.5C51.2068 23.644 46.4516 20.2767 39.3806 18.4714Z"
          fill="#121212"
        />
      </svg>
    </SvgWrap>
  );
};

export default RELIEF;
