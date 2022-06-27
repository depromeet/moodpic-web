import theme from '@/styles/theme';
import styled from 'styled-components';

export const CardContainer = styled.aside`
  position: relative;
  height: 6.3rem;
  padding: 2.2rem 3.6rem;
  border-radius: 1.4rem;
  text-align: center;

  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: -0.01em;
  color: ${theme.colors.white};
  background: ${theme.colors.gray1};
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  opacity: 0.6;
`;

export const ImageBox = styled.div`
  position: absolute;
  width: 9.5rem;
  height: 6.3rem;

  &:first-child {
    left: -0.8rem;
    top: -1.1rem;
    transform: rotate(-180deg);
  }

  &:last-child {
    right: -0.4rem;
    bottom: -0.7rem;
  }
`;

export const HighlightText = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;
