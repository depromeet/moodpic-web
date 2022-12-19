import { ROUTES } from '@/shared/constants/routes';
import { WriteModeType } from '@/shared/type/common';
import { writeModeStateAtom } from '@/store/writeMode/atom';
import theme from '@/styles/theme';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import Button from '../Button/Button';

interface Props {
  content: string;
  imgSrc: StaticImageData;
  writeMode: WriteModeType;
  index: number;
}

const FABMenuItem = ({ content, imgSrc, writeMode, index }: Props) => {
  const router = useRouter();
  const setWriteMode = useSetRecoilState(writeModeStateAtom);

  const goToDestination = () => {
    setWriteMode(writeMode);
    router.push(ROUTES.WRITE);
  };

  return (
    <CustomizedButton color="gray" hasBorderRadius onClick={goToDestination} size="medium" index={index}>
      <Image src={imgSrc} alt={imgSrc.src} />
      {content}
    </CustomizedButton>
  );
};

export default FABMenuItem;

const CustomizedButton = styled(Button)<{ index: number }>`
  position: fixed;
  display: flex;
  align-items: center;
  right: 3rem;
  height: 5.6rem;
  padding: 0 2rem;
  border-radius: 1.2rem;
  background-color: ${theme.colors.gray2};
  & > span {
    margin-right: 4px !important;
  }
  ${({ index }) =>
    index >= 0 &&
    css`
      bottom: calc(${index} * 6.8rem + 11.6rem);
    `};
`;
