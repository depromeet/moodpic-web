import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import CommonButton from '@/components/Common/Button/Button';
import theme from '@/styles/theme';

export interface BannerProps {
  nickname: string;
}

const Banner = ({ nickname }: BannerProps): React.ReactElement => {
  const router = useRouter();

  return (
    <BannerContainer>
      <BannerTitle>
        {nickname}님, 오늘의 감정을 <br />
        풀어보는 시간을 가져봐요.
      </BannerTitle>
      <CommonButton onClick={() => router.push('/write/pre-emotion')}>
        감정 기록하기 ✍🏻
      </CommonButton>
    </BannerContainer>
  );
};

const BannerContainer = styled.section`
  margin: 0 -18px;
  padding: 44px 18px 24px;
  // TODO: 그래픽으로 변경될 예정
  background-color: ${theme.colors.gray1};
`;

const BannerTitle = styled.h2`
  ${theme.fonts.subtitle1};
  color: ${theme.colors.white};
  margin-bottom: 54px;
`;

export default Banner;
