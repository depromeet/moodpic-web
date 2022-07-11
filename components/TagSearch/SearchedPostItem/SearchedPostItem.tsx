import React from 'react';
import { Post } from '@/shared/type/post';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { CommonIconButton, CommonTagButton } from '@/components/Common';

interface SearchedPostItemProps {
  searchedPost: Post;
}
const SearchedPostItem = ({ searchedPost }: SearchedPostItemProps) => {
  const { tags, firstCategory, secondCategory, content, views, my, createdAt } = searchedPost;

  const MAX_TAG_COUNTS = 3;

  const processContents = (contents: Post['content']) => {
    const MAX_CONTENTS_LENGTH = 30;
    const REMAIN_CONTENTS_FLAG = '...';

    if (contents.length > MAX_CONTENTS_LENGTH) {
      return contents.slice(0, MAX_CONTENTS_LENGTH) + REMAIN_CONTENTS_FLAG;
    }

    return contents;
  };

  // TODO: react-query로 옮겨가야 할 로직이라고 생각되네요.
  const transformDateToUnit = (stringDate: string) => {
    const [date, time] = stringDate.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, min, sec] = time.split(':');

    return {
      year,
      month,
      day,
      hour,
      min,
      sec,
    };
  };

  const { year, month, day, hour, min } = transformDateToUnit(createdAt);

  // TODO: content를 클릭하면 기록 상세 보기 페이지로 push
  if (searchedPost == undefined) return null;

  return (
    <Container>
      <TagsContainer>
        {tags.slice(0, MAX_TAG_COUNTS).map((tag, index) => (
          <CommonTagButton key={`tag-${index}`}>#{tag}</CommonTagButton>
        ))}
      </TagsContainer>
      <CategoryContainer>
        {my && <MyPostFlag>MY</MyPostFlag>}
        <CategoryItem>{'감정' || firstCategory}</CategoryItem>
        <ArrowIconContainer>
          <CommonIconButton iconName={'arrowright'} />
        </ArrowIconContainer>
        <CategoryItem>{'감정' || secondCategory}</CategoryItem>
      </CategoryContainer>
      <Content>{processContents(content)}</Content>
      <CreateAndViewContainer>
        <CreateAt>
          {year}년 {month}월 {day}일 {hour}:{min}
        </CreateAt>
        <CreateAt>조회수 {views.toLocaleString()}</CreateAt>
      </CreateAndViewContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border-radius: 1.6rem;
  background: ${theme.colors.gray2};
  padding: 1.8rem;
`;

const ArrowIconContainer = styled.div`
  margin: 0 0.8rem;
  width: 1.6rem;
  height: 1.6rem;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const MyPostFlag = styled.div`
  margin-right: 1.2rem;
  display: flex;
  border-radius: 1.1rem;
  width: 3.4rem;
  height: 2.2rem;
  background: ${theme.colors.primary};
  justify-content: center;
  align-items: center;
  ${theme.fonts.caption1}
`;

const CategoryContainer = styled.div`
  margin-top: 1.8rem;
  display: flex;
  align-items: center;
`;

const CategoryItem = styled.div`
  background: ${theme.colors.gray3};
  color: ${theme.colors.white};
  border-radius: 1rem;
  width: 6rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${theme.fonts.h4}
`;

const Content = styled.div`
  margin-top: 1.8rem;
  margin-bottom: 2rem;
  color: ${theme.colors.white};
  cursor: pointer;
  ${theme.fonts.body}
`;

const CreateAndViewContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
`;

const CreateAt = styled.p`
  ${theme.fonts.caption1}
  color: ${theme.colors.gray4}
`;

export default SearchedPostItem;
