import styled from 'styled-components';
import theme from '@/styles/theme';

export const FolderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16.5rem;
  cursor: pointer;
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

export const BoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  span {
    border-radius: 1.4rem;
  }
`;

export const CaptionContainer = styled.figcaption`
  display: flex;
  align-items: flex-start;
  margin-top: 0.8rem;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
`;

export const EditButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.8rem;
`;
