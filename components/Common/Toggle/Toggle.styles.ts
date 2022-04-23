import { a11y, transition } from '@/styles/mixins';
import styled, { css } from 'styled-components';
import theme from '@/styles/theme';

export const ToggleWrapper = styled.label`
  display: inline-flex;
  overflow: hidden;

  width: 58px;
  height: 28px;
  border-radius: 14px;
  cursor: pointer;
`;

export const Trigger = styled.input`
  ${a11y};
`;

export const ToggleText = styled.span<{ checked: boolean }>`
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: ${theme.fonts.caption2};
  color: ${theme.colors.black};
  ${(props) =>
    props.checked &&
    css`
      left: 12px;
    `};
`;

export const Icon = styled.span`
  ${a11y};
`;

export const IconWrapper = styled.i`
  position: relative;
  flex: 1;

  padding: 4px;
  background-color: ${theme.colors.gray4};

  &::after {
    content: '';
    display: block;

    width: 20px;
    height: 20px;
    border-radius: 50%;

    background-color: ${theme.colors.white};
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);

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
