import styled from 'styled-components';
import theme from '@/styles/theme';

export const FolderContainer = styled.figure`
  width: 100%;
  height: 100%;
`;

export const Caption = styled.figcaption`
  padding-top: 8px;
`;

export const FolderName = styled.p`
  margin-bottom: 4px;
  ${theme.fonts.btn2};
  color: ${theme.colors.white};
`;

export const FolderCount = styled.span`
  ${theme.fonts.caption1};
  color: ${theme.colors.gray4};
`;

export const ImageConatiner = styled.div`
  height: 100%;
`;

export const BoxContainer = styled.figure`
  display: flex;
`;
