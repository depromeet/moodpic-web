import { ROUTES } from '@/shared/constants/routes';
import theme from '@/styles/theme';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../../Common/Button/Button';

interface Props {
  content: string;
  imgSrc: StaticImageData;
  index: number;
}

const FABMenuItem = ({ content, imgSrc, index }: Props) => {
  const router = useRouter();

  return (
    <CustomizedButton
      color="gray"
      hasBorderRadius
      onClick={() => router.push(ROUTES.WRITE)}
      size="medium"
      index={index}
    >
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
