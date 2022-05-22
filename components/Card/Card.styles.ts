import theme from '@/styles/theme';
import styled, { css } from 'styled-components';

export const CardContainer = styled.aside<{ firstColor: string; secondColor: string }>`
  position: relative;
  ${theme.fonts.h4};

  height: 6.3rem;
  padding: 2.2rem 3.6rem;
  border-radius: 1.4rem;
  text-align: center;

  ${(props) => {
    return css`
      background: linear-gradient(90deg, ${props.firstColor} 0%, ${props.secondColor} 100.44%);
    `;
  }}
`;

export const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  span:first-child {
    img {
      transform: rotate(-180deg);
    }
  }

  img {
    mix-blend-mode: overlay;
  }
`;
