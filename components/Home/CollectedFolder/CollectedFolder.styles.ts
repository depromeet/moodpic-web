import styled, { css } from 'styled-components';
import theme from '@/styles/theme';

export const CollectedFolderContainer = styled.figure`
  width: 100%;
  cursor: pointer;
`;

export const Caption = styled.figcaption`
  padding-top: 0.8rem;
`;

export const FolderName = styled.p`
  margin-bottom: 0.4rem;
  ${theme.fonts.btn2};
  color: ${theme.colors.white};
`;

export const FolderCount = styled.span`
  ${theme.fonts.caption1};
  color: ${theme.colors.gray4};
`;

export const BoxContainer = styled.figure`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
`;

export const FolderImage = styled.div<{ thumbnail?: string }>`
  border-radius: 1rem;
  padding-top: 100%;
  background-size: cover;
  background-color: ${theme.colors.gray2};
  ${(props) =>
    props.thumbnail &&
    css`
      background-image: url(${props.thumbnail});
    `};
`;
