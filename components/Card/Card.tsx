import React from 'react';
import { CardContainer } from './Card.styles';

export interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps): React.ReactElement => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
