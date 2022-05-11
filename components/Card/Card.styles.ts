import theme from '@/styles/theme';
import styled, { css } from 'styled-components';
import { CardProps } from './Card';

export const CardContainer = styled.aside<
  Pick<CardProps, 'firstColor' | 'secondColor'>
>`
  position: relative;
  ${theme.fonts.h4};

  height: 6.3rem;
  padding: 2.2rem 3.6rem;
  border-radius: 1.4rem;
  text-align: center;

  ${(props) => {
    return css`
      background: linear-gradient(
        90deg,
        ${props.firstColor} 0%,
        ${props.secondColor} 100.44%
      );
    `;
  }}
`;

export const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1.4rem;

  img {
    mix-blend-mode: overlay;
  }
`;
