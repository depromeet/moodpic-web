import React from 'react';
import styled from 'styled-components';
import { CommonBottomSheetContainer, CommonIconButton } from '@/components/Common';
import theme from '@/styles/theme';
import Image from 'next/image';
import AppIcon from '/public/icon-512x512.png';
import AddWhiteIcon from '/public/svgs/add-white.svg';
import DownloadSafariIcon from '/public/svgs/download-safari.svg';

export interface ScreenGuideProps {
  toggleSheet: () => void;
  onClose: () => void;
}

const HomeScreenGuide = ({ toggleSheet, onClose }: ScreenGuideProps): React.ReactElement => {
  return (
    <CommonBottomSheetContainer onClose={toggleSheet} bottomSheetHeight={390}>
      <GuideContainer>
        <ButtonContainer>
          <CommonIconButton iconName="close" onClick={onClose} />
        </ButtonContainer>
        <GuideImage>
          <Image src={AppIcon} alt="무드픽" />
        </GuideImage>
        <GuideContents>
          더 편하고 빠르게 무드픽으로 진입해
          <br />
          감정을 기록할 수 있어요.
        </GuideContents>
        <GuideTooltip>
          <span>홈 화면에 추가</span>
          <Image src={AddWhiteIcon} alt="" width={18} height={18} />
        </GuideTooltip>
        <IconContainer>
          <Image src={DownloadSafariIcon} alt="홈 화면에 추가" width={19} height={25} />
        </IconContainer>
      </GuideContainer>
    </CommonBottomSheetContainer>
  );
};

const GuideContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 1.6rem 0;
`;

const GuideImage = styled.div`
  width: 8.7rem;
  height: 8.7rem;
  border-radius: 1.7rem;

  span {
    border-radius: 2.7rem;
  }
`;

const GuideContents = styled.p`
  margin: 2.6rem 0 3.2rem;
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

const GuideTooltip = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4.8rem;
  margin-bottom: 2.6rem;
  padding: 0 1.5rem;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  line-height: 160%;
  letter-spacing: -0.01em;
  background-color: ${theme.colors.gray3};
  color: ${theme.colors.white};

  &::after {
    border-top: 1rem solid ${theme.colors.gray3};
    border-left: 0.8rem solid transparent;
    border-right: 0.8rem solid transparent;
    border-bottom: 0 solid transparent;
    content: '';
    position: absolute;
    bottom: -0.9rem;
    left: calc(50% - 0.8rem);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.3rem;
  height: 4.3rem;
  background-color: ${theme.colors.gray3};
  border-radius: 0.7rem;
`;

export default HomeScreenGuide;
