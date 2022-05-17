import styled, { css } from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { TagButtonProps } from './TagButton';

export const TagButtonContainer = styled.div<
  Pick<TagButtonProps, 'exampleTagMode'>
>`
  display: inline-flex;
  padding: 0.6rem 1.4rem;
  border: 0.1rem solid ${theme.colors.gray6};
  border-radius: 14.5px;
  ${(props) =>
    props.exampleTagMode &&
    css`
      border: 1px solid ${theme.colors.gray3};
    `}
`;

export const Text = styled.span<{
  canDelete: boolean;
  exampleTagMode: boolean;
}>`
  color: ${theme.colors.gray6};
  ${theme.fonts.btn2};
  ${(props) =>
    props.canDelete &&
    css`
      margin-right: 1.4rem;
    `}
  ${(props) =>
    props.exampleTagMode &&
    css`
      color: ${theme.colors.gray3};
    `}
`;

export const CloseImage = styled(Image)`
  cursor: pointer;
`;
