import Image, { StaticImageData } from 'next/image';
import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface ImageMessageProps {
  src: StaticImageData;
  children: string;
  alt?: string;
}

const ImageMessage = ({ src, children, alt = 'alt' }: ImageMessageProps) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={src} alt={alt} />
      </ImageContainer>
      <GuideMessage>{children}</GuideMessage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 7.7rem;
  height: 8.3rem;
  margin: 12.6rem 0 0 0.4rem;
`;

const GuideMessage = styled.p`
  ${theme.fonts.h4};
  margin-top: 1.8rem;
  opacity: 0.7;
  color: ${theme.colors.gray4};
`;

export default ImageMessage;
