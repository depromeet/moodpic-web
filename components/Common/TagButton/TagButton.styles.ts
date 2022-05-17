import styled, { css } from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';

export const TagButtonContainer = styled.div`
  display: inline-flex;
  padding: 0.6rem 1.4rem;
  border: 0.1rem solid ${theme.colors.gray6};
  border-radius: 14.5px;
`;

export const Text = styled.span<{ canDelete: boolean }>`
  color: ${theme.colors.gray6};
  ${theme.fonts.btn2};

  ${(props) =>
    props.canDelete &&
    css`
      margin-right: 1.4rem;
    `}
`;

export const CloseImage = styled(Image)`
  cursor: pointer;
`;
