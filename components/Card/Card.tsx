import React from 'react';
import Image from 'next/image';
import { EMOTION_COLOR_TYPE } from '@/shared/constants/emotion';
import { EmotionColorType } from '@/shared/constants/emotion';
import { CardContainer, ImageContainer } from './Card.styles';

export interface CardProps {
  firstEmotion: EmotionColorType;
  secondEmotion: EmotionColorType;
  children: React.ReactNode;
}

const Card = ({ firstEmotion, secondEmotion, children }: CardProps): React.ReactElement => {
  return (
    <CardContainer firstColor={EMOTION_COLOR_TYPE[firstEmotion]} secondColor={EMOTION_COLOR_TYPE[secondEmotion]}>
      <ImageContainer>
        <Image src={`/svgs/mood-${firstEmotion.toLowerCase()}.svg`} alt="" width={95} height={63} />
        <Image src={`/svgs/mood-${secondEmotion.toLowerCase()}.svg`} alt="" width={95} height={63} />
      </ImageContainer>
      {children}
    </CardContainer>
  );
};

export default Card;
