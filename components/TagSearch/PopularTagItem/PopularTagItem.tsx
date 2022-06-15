import React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { Tag } from '../../../shared/type/post';

interface PopularTagItemProps {
  rank: number;
  title: string;
  onClick: (tagTitle: Tag) => void;
}

const PopularTagItem = ({ rank, title, onClick }: PopularTagItemProps) => {
  const TAG_FLAG = '#';

  return (
    <Container>
      <Rank>{rank}</Rank>
      <Title onClick={() => onClick(title)}>
        {TAG_FLAG}
        {title}
      </Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  align-items: center;
  border-bottom: 0.1rem solid ${theme.colors.gray2};
`;

const Rank = styled.h4`
  display: flex;
  color: ${theme.colors.primary};
  ${theme.fonts.h4};
`;

const Title = styled.p`
  margin-left: 1.7rem;
  ${theme.fonts.h4};
  color: ${theme.colors.white};
  cursor: pointer;
`;

export default PopularTagItem;
