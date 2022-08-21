import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { CommonButton } from '@/components/Common';
import theme from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';

export interface BannerProps {
  nickname: string;
  title: ReactNode;
  background: string;
}

const Banner = ({ nickname, title, background }: BannerProps): React.ReactElement => (
  <BannerContainer>
    <BannerImage />
    <Image src={background} alt="" layout="fill" priority={true} />
    <BannerContents>
      <BannerTitle>
        {nickname}
        {title}
      </BannerTitle>
      <CommonButton>
        <Link href="/write" passHref>
          <a>감정 기록하기 ✍🏻</a>
        </Link>
      </CommonButton>
    </BannerContents>
  </BannerContainer>
);

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
