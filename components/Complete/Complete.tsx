import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPostRequestState, createPostResponseState } from '@/store/post/atom';
import ANXIOUS from 'public/images/img_ANXIOUS.png';
import CALMDOWN from 'public/images/img_CALMDOWN.png';
import DISAPPOINTMENT from 'public/images/img_DISAPPOINTMENT.png';
import DONTKNOW from 'public/images/img_DONTKNOW.png';
import EASYGOING from 'public/images/img_EASYGOING.png';
import IRRITATION from 'public/images/img_IRRITATION.png';
import JOY from 'public/images/img_JOY.png';
import LETHARGY from 'public/images/img_LETHARGY.png';
import PROUD from 'public/images/img_PROUD.png';
import REGRET from 'public/images/img_REGRET.png';
import RELIEF from 'public/images/img_RELIEF.png';
import SADNESS from 'public/images/img_SADNESS.png';

type RandomTextProps = { [x: number]: React.ReactElement | string };

const randomText: RandomTextProps = {
  0: (
    <>
      부정적인 생각들은 <br />
      moodpic이 처리했으니 안심하라구~
    </>
  ),
  1: (
    <>
      생각이 정리된 후 <br />
      다시 감정을 선택할 수 있어요.
    </>
  ),
  2: (
    <>
      생각 정리에 도움이 됐나요? <br /> 스스로에게 듬~뿍 칭찬해주세요!
    </>
  ),
  3: (
    <>
      한결 나아졌어요 👍🏻 <br /> moodpic아 고마워!
    </>
  ),
  4: '기록된 감정은 홈화면에서 확인할 수 있어요.',
};

const Complete = () => {
  const resetPostRequest = useResetRecoilState(createPostRequestState);
  const { secondCategory } = useRecoilValue(createPostRequestState);
  const { postId } = useRecoilValue(createPostResponseState);
  const router = useRouter();

  const pickRandomText = () => {
    const randomNumberZeroToFive = Math.floor(Math.random() * 5);
    return randomText[randomNumberZeroToFive];
  };

  const renderSecondCategoryImage = (secondCategory: string) => {
    if (secondCategory === 'ANXIOUS')
      return <Image src={ANXIOUS} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />;
    if (secondCategory === 'CALMDOWN')
      return (
        <Image src={CALMDOWN} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />
      );
    if (secondCategory === 'DISAPPOINTMENT')
      return (
        <Image
          src={DISAPPOINTMENT}
          alt={secondCategory}
          width={232}
          height={209}
          priority
          loading="eager"
          unoptimized
        />
      );
    if (secondCategory === 'DONTKNOW')
      return (
        <Image src={DONTKNOW} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />
      );
    if (secondCategory === 'EASYGOING')
      return (
        <Image src={EASYGOING} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />
      );
    if (secondCategory === 'IRRITATION')
      return (
        <Image src={IRRITATION} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />
      );
    if (secondCategory === 'JOY')
      return <Image src={JOY} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />;
    if (secondCategory === 'LETHARGY')
      return (
        <Image src={LETHARGY} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />
      );
    if (secondCategory === 'PROUD')
      return <Image src={PROUD} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />;
    if (secondCategory === 'REGRET')
      return <Image src={REGRET} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />;
    if (secondCategory === 'SADNESS')
      return <Image src={SADNESS} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />;
    return <Image src={RELIEF} alt={secondCategory} width={232} height={209} priority loading="eager" unoptimized />;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (postId) router.replace(`/posts/${postId}`);
      else router.replace('/');
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [router, postId]);

  useEffect(() => {
    return () => {
      resetPostRequest();
    };
  }, [resetPostRequest]);

  return (
    <>
      <ImageWrap>
        {secondCategory ? (
          renderSecondCategoryImage(secondCategory)
        ) : (
          <Image src={`/images/img_DONTKNOW.png`} alt="DONTKNOW" width={232} height={209} />
        )}
      </ImageWrap>
      <Title>감정이 기록됐어요!</Title>
      <Description>{pickRandomText()}</Description>
    </>
  );
};

export default Complete;

const ImageWrap = styled.div`
  margin: 9.5rem 0 4rem;
  text-align: center;
`;

const Title = styled.div`
  ${theme.fonts.h2}
  line-height: 2.4rem;
  text-align: center;
  color: ${theme.colors.white};
  margin-bottom: 1.2rem;
`;
const Description = styled.div`
  ${theme.fonts.body};
  text-align: center;
  color: ${theme.colors.gray5};
`;
