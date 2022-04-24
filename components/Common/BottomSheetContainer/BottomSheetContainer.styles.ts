import styled from 'styled-components';
import Image from 'next/image';
import { animated } from 'react-spring';
import theme from '@/styles/theme';

export const BottomSheetWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
`;

export const BottomSheetDimmed = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const BottomSheetWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const BottomSheetInner = styled(animated.div)`
  max-width: 480px;
  width: 100%;
  max-height: 530px;
  height: 100%;
  margin: 0 auto;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  background-color: ${theme.colors.gray2};
`;

export const BottomSheetHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  background-color: ${theme.colors.gray2};
  padding: 32px 36px;
  & > div {
    display: flex;
    align-items: center;
  }
  & > div > div {
    display: inline-block;
    ${theme.fonts.h4};
    color: ${theme.colors.white};
    margin-left: 5px;
  }
`;

export const CustomImage = styled(Image)`
  cursor: pointer;
`;
