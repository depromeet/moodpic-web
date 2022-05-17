import React from 'react';
import Image from 'next/image';
import { CardContainer, ImageContainer } from './Card.styles';
import MoodBoard from 'public/images/mood-board.png';
import { EmotionColorType } from '@/shared/constants/emotion';

export interface CardProps {
  firstColor: EmotionColorType;
  secondColor: EmotionColorType;
  children: React.ReactNode;
}

const Card = ({ firstColor, secondColor, children }: CardProps): React.ReactElement => {
  return (
    <CardContainer firstColor={firstColor} secondColor={secondColor}>
      <ImageContainer>
        <Image src={MoodBoard} alt="" width="100%" height="100%" layout="fill" />
      </ImageContainer>
      {children}
    </CardContainer>
  );
};

export default Card;
