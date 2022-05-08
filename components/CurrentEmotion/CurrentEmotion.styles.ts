import Image from 'next/image';
import styled from 'styled-components';
import theme from '@/styles/theme';

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div.space-between {
    display: flex;
    justify-content: space-between;
    margin-bottom: 36px;
    & > span {
      ${theme.fonts.caption1};
    }
  }
  & > div:last-child {
    margin-bottom: 40px;
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
    margin-right: 28px;
  }
`;

export const TextFieldWrap = styled.div`
  margin: 13px 0 24px;
`;

export const TagButtonWrap = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 50px;
`;

export const Divider = styled.div`
  width: calc(100% + 36px);
  height: 6px;
  background-color: ${theme.colors.gray1};
  margin-bottom: 40px;
  transform: translateX(-18px);
`;

export const CustomImage = styled(Image)`
  cursor: pointer;
`;
