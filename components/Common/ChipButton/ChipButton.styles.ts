import styled, { css } from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';

export const ChipButtonContainer = styled.div`
  display: inline-flex;
  padding: 6px 14px;
  border: 1px solid ${theme.colors.gray6};
  border-radius: 14.5px;
`;

export const Text = styled.span<{ canDelete: boolean }>`
  color: ${theme.colors.gray6};
  ${theme.fonts.btn2};

  ${(props) =>
    props.canDelete &&
    css`
      margin-right: 14px;
    `}
`;

export const CloseImage = styled(Image)`
  cursor: pointer;
`;
