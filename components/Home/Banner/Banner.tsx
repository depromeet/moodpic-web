import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { tooltipStateAtom } from '@/store/tooltip/atom';
import { CommonButton } from '@/components/Common';
import theme from '@/styles/theme';
import Image from 'next/image';

export interface BannerProps {
  title: ReactNode;
  background: string;
}

const Banner = ({ title, background }: BannerProps): React.ReactElement => {
  const router = useRouter();
  const setTooltipState = useSetRecoilState(tooltipStateAtom);

  const goToWritePage = () => {
    router.push('/write');
    setTooltipState(true);
  };

  return (
    <BannerContainer>
      <BannerImage />
      <Image src={background} alt="" layout="fill" priority={true} />
      <BannerContents>
        <BannerTitle>닉네임{title}</BannerTitle>
        <CommonButton onClick={goToWritePage}>감정 기록하기 ✍🏻</CommonButton>
      </BannerContents>
    </BannerContainer>
  );
};

const BannerContainer = styled.section`
  position: relative;
  height: 24.8rem;
  margin-right: -1.8rem;
  margin-left: -1.8rem;
  padding: 4.4rem 1.8rem 2.4rem;
`;

const BannerImage = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 33.6rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #121212 42.71%, rgba(18, 18, 18, 0) 100%);
    z-index: 1;
  }
`;

const BannerContents = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 33.6rem;
  padding: 13.2rem 1.8rem 2.4rem;
  z-index: 2;
`;

const BannerTitle = styled.div`
  ${theme.fonts.subtitle1};
  color: ${theme.colors.white};
  margin-bottom: 5.4rem;
  white-space: pre-wrap;
`;

export default Banner;
