import React from 'react';
import Image from 'next/image';
import { EmotionColorType, EMOTION_COLOR_TYPE } from '@/shared/constants/category';
import { CardContainer, ImageContainer, ImageBox, HighlightText } from './Card.styles';

export interface CardProps {
  firstCategory: EmotionColorType;
  secondCategory: EmotionColorType;
  firstCategoryName?: string;
  secondCategoryName?: string;
}

const Card = ({
  firstCategory,
  secondCategory,
  firstCategoryName,
  secondCategoryName,
}: CardProps): React.ReactElement => {
  return (
    <CardContainer>
      <ImageContainer>
        <ImageBox>
          <Image src={`/category-images/banner-${firstCategory.toLowerCase()}.png`} alt="" width={95} height={63} />
        </ImageBox>
        <ImageBox>
          <Image src={`/category-images/banner-${secondCategory.toLowerCase()}.png`} alt="" width={95} height={63} />
        </ImageBox>
      </ImageContainer>
      그땐&nbsp;
      <HighlightText color={EMOTION_COLOR_TYPE[firstCategory]}>{firstCategoryName}</HighlightText>, &nbsp;지금은&nbsp;
      <HighlightText color={EMOTION_COLOR_TYPE[secondCategory]}>{secondCategoryName}</HighlightText>
    </CardContainer>
  );
};

export default Card;
