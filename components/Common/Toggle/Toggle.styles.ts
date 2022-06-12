import { a11y, transition } from '@/styles/mixins';
import styled, { css } from 'styled-components';
import theme from '@/styles/theme';

export const ToggleWrapper = styled.label`
  display: inline-flex;
  overflow: hidden;

  width: 5.8rem;
  height: 2.8rem;
  border-radius: 1.4rem;
  cursor: pointer;
`;

export const Trigger = styled.input`
  ${a11y};
`;

export const ToggleText = styled.span<{ checked: boolean }>`
  position: absolute;
  top: 0.8rem;
  right: 1.2rem;
  ${theme.fonts.caption2};
  color: ${theme.colors.black};
  ${(props) =>
    props.checked &&
    css`
      left: 1.2rem;
    `};
`;

export const Icon = styled.span`
  ${a11y};
`;

export const IconWrapper = styled.i`
  position: relative;
  flex: 1;

  padding: 0.4rem;
  background-color: ${theme.colors.gray4};

  &::after {
    content: '';
    display: block;

    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    background-color: ${theme.colors.white};
    box-shadow: 0rem 0.1rem 0.4rem rgba(0, 0, 0, 0.25);

    transform: translate3d(0, 0, 0);
    ${transition()};
  }

  ${Trigger}:checked ~ & {
    background-color: ${theme.colors.primary};

    &::after {
      transform: translate3d(150%, 0, 0);
    }
  }
`;
