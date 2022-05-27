import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { tooltipStateAtom } from '@/store/tooltip/atom';
import { CommonButton } from '@/components/Common';
import theme from '@/styles/theme';

export interface BannerProps {
  nickname: string;
  title: string;
  background: string;
}

const Banner = ({ nickname, title, background }: BannerProps): React.ReactElement => {
  const router = useRouter();
  const setTooltipState = useSetRecoilState(tooltipStateAtom);

  const goToWritePage = () => {
    router.push('/write');
    setTooltipState(true);
  };

  const bannerTitleHTML = `${nickname}${title}`;

  return (
    <BannerContainer>
      <BannerImage background={background} />
      <BannerContents>
        <BannerTitle dangerouslySetInnerHTML={{ __html: bannerTitleHTML }}></BannerTitle>
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

const BannerImage = styled.div<{ background: string }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 33.6rem;
  background-image: url(${(props) => props.background});
  background-size: 100% 33.6rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #121212 42.71%, rgba(18, 18, 18, 0) 100%);
  }
`;

const BannerContents = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 33.6rem;
  padding: 13.2rem 1.8rem 2.4rem;
`;

const BannerTitle = styled.div`
  ${theme.fonts.subtitle1};
  color: ${theme.colors.white};
  margin-bottom: 5.4rem;
  white-space: pre-wrap;
`;

export default Banner;
