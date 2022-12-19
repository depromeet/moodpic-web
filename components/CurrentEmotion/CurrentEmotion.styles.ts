import Image from 'next/image';
import styled from 'styled-components';
import theme from '@/styles/theme';

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.2rem;
  & > div.space-between {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.6rem;
    & > span {
      ${theme.fonts.caption1};
    }
  }
  & > div:last-child {
    margin-bottom: 4rem;
  }
`;

export const OptionTitle = styled.div`
  ${theme.fonts.h4}
  font-weight: bold;
  line-height: 2.8rem;
  color: ${theme.colors.white};
`;

export const FolderWrap = styled.div`
  display: flex;
  & > button {
    margin-right: 2.8rem;
  }
`;

export const TextFieldWrap = styled.div`
  margin: 1.3rem 0 2.4rem;
`;

export const TagButtonWrap = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 5rem;
`;

export const Divider = styled.div`
  width: calc(100% + 3.6rem);
  height: 0.6rem;
  background-color: ${theme.colors.gray1};
  margin-bottom: 4rem;
  transform: translateX(-1.8rem);
`;

export const CustomImage = styled(Image)`
  cursor: pointer;
`;
