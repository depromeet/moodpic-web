import React from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { transition } from '@/styles/mixins';
import theme from '@/styles/theme';
import RightIcon from 'public/svgs/right-small.svg';
import { CommonButton } from '@/components/Common';
import DontknowIcon from 'public/category-images/category-dontknow.png';

interface FloatingButtonProps {
  isScrollOnTop: boolean;
}

const FloatingButton = ({ isScrollOnTop }: FloatingButtonProps) => {
  const router = useRouter();

  const goToDontknowFeelings = () => {
    router.push('/posts/dontknow-feelings');
  };

  return (
    <FloatingContainer isHidden={!isScrollOnTop}>
      <div>
        <CommonButton color="gray" onClick={goToDontknowFeelings}>
          <ButtonText>
            <Image src={DontknowIcon} alt="" width={20} height={20} />
            <strong>모르겠어요</strong>를 선택한 기록들
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
    width: 24.2rem;
    margin: 0 auto;

    button {
      background-color: ${theme.colors.black};
      border: 0.1rem solid ${theme.colors.gray3};
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
    }
  }
`;

const ButtonText = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1.9rem 0 2.2rem;
  ${theme.fonts.btn2};

  strong {
    margin-left: 0.2rem;
    color: ${theme.colors.gray5};
  }
`;

const ButtonIcon = styled.i`
  position: absolute;
  top: 0.2rem;
  right: 2rem;
`;

export default FloatingButton;
