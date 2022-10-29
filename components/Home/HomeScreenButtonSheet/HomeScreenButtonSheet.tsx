import React from 'react';
import styled from 'styled-components';
import { CommonButton, CommonIconButton } from '@/components/Common';
import theme from '@/styles/theme';
import Image from 'next/image';
import AppIcon from '/public/icon-512x512.png';

export interface ScreenButtonSheetProps {
  onClick: () => void;
  onClose: () => void;
}

const HomeScreenButtonSheet = ({ onClick, onClose }: ScreenButtonSheetProps): React.ReactElement => {
  return (
    <SheetContainer>
      <ButtonContainer>
        <CommonIconButton iconName="close" onClick={onClose} />
      </ButtonContainer>
      <SheetTitle>홈 화면에 추가</SheetTitle>
      <SheetImage>
        <Image src={AppIcon} alt="무드픽" />
      </SheetImage>
      <SheetContents>
        더 편하고 빠르게 무드픽으로 진입해
        <br />
        감정을 기록할 수 있어요.
      </SheetContents>
      <CommonButton size="large" onClick={onClick}>
        추가
      </CommonButton>
    </SheetContainer>
  );
};

const SheetContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 2rem 0;
`;

const SheetImage = styled.div`
  width: 8.7rem;
  height: 8.7rem;
  border-radius: 2.7rem;

  span {
    border-radius: 2.7rem;
  }
`;

const SheetTitle = styled.h4`
  font-weight: bold;
  font-size: 2.4rem;
  line-height: 160%;
  letter-spacing: -0.01rem;
  color: ${theme.colors.white};
  margin-bottom: 3.2rem;
`;

const SheetContents = styled.p`
  margin: 3.2rem 0 4.6rem;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 160%;
  letter-spacing: -0.01rem;
  color: ${theme.colors.gray5};
  text-align: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 3rem;
  right: 3.6rem;
`;

export default HomeScreenButtonSheet;
