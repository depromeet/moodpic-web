import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { transition } from '@/styles/mixins';
import theme from '@/styles/theme';
import RightIcon from 'public/svgs/right-small.svg';
import { CommonButton } from '@/components/Common';
import { useRouter } from 'next/router';

interface FloatingButtonProps {
  isScrollOnTop: boolean;
}

const FloatingButton = ({ isScrollOnTop }: FloatingButtonProps) => {
  const router = useRouter();

  const goToUndefinedFeelings = () => {
    router.push('/posts/undefined-feelings');
  };

  return (
    <FloatingContainer isHidden={!isScrollOnTop}>
      <div>
        <CommonButton color="gray" onClick={goToUndefinedFeelings}>
          <ButtonText>
            &apos;모르겠어요&apos;를 선택한 기록들
            <ButtonIcon>
              <Image src={RightIcon} alt="" />
            </ButtonIcon>
          </ButtonText>
        </CommonButton>
      </div>
    </FloatingContainer>
  );
};

const FloatingContainer = styled.div<{ isHidden: boolean }>`
  ${transition()};
  position: fixed;
  left: 0;
  bottom: 5.6rem;
  width: 100%;
  z-index: 1001;
  ${(props) =>
    props.isHidden &&
    css`
      transform: translate3d(0, 200%, 0);
    `};

  > div {
    width: 22.3rem;
    margin: 0 auto;
  }
`;

const ButtonText = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1.9rem 0 2.2rem;
  ${theme.fonts.btn2};
`;

const ButtonIcon = styled.i`
  position: absolute;
  top: 0;
  right: 1.9rem;
`;

export default FloatingButton;
