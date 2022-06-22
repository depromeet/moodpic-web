import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { ellipsis } from '@/styles/mixins';
import { CommonCheckbox, CommonChipButton, CommonTagButton } from '@/components/Common';
import ArrowRightIcon from 'public/svgs/arrowright.svg';
import { Post } from '@/shared/type/post';
import { CONTENT_SEPARATOR } from '@/shared/constants/question';
import { formatDate } from '@/shared/utils/date';
import { commaNumber } from '@/shared/utils/formatter';

export interface PostItemProps {
  post: Post;
  isSearchedByTag?: boolean;
  canEdit?: boolean;
  isMine?: boolean;
  isEditing?: boolean;
  checked?: boolean;
  onClick: () => void;
}

const PostItem = ({
  post: { id, tags, firstCategoryName, secondCategoryName, content, createdAt, views },
  isSearchedByTag = false,
  isMine = false,
  isEditing = false,
  checked = false,
  onClick,
}: PostItemProps): React.ReactElement => {
  const firstContent = content.includes(CONTENT_SEPARATOR) ? content.split(CONTENT_SEPARATOR)[0] : content;

  return (
    <PostItemContainer isEditing={isEditing} onClick={onClick}>
      {isEditing && (
        <>
          <CheckboxContainer>
            <CommonCheckbox name="checkbox" value={id} checked={checked} />
          </CheckboxContainer>
          <Dimmed checked={checked} />
        </>
      )}
      {isSearchedByTag && (
        <TagList>
          {tags.map((tag: string, index: number) => (
            <CommonTagButton key={index}>#{tag}</CommonTagButton>
          ))}
        </TagList>
      )}
      {!isSearchedByTag && (
        <ChipContainer>
          <CommonChipButton>{firstCategoryName}</CommonChipButton>
          <Arrow>
            <Image src={ArrowRightIcon} alt="" width={16} height={16} />
          </Arrow>
          <CommonChipButton>{secondCategoryName}</CommonChipButton>
        </ChipContainer>
      )}
      <Content>{firstContent}</Content>
      <BottomContainer>
        {isMine && <HighlightButton>MY</HighlightButton>}
        <CaptionContainer>
          <Caption>{formatDate(createdAt)}</Caption>
          {isSearchedByTag && <Caption>조회수 {commaNumber(views)}</Caption>}
        </CaptionContainer>
      </BottomContainer>
    </PostItemContainer>
  );
};

const PostItemContainer = styled.li<Pick<PostItemProps, 'isEditing' | 'checked'>>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 1.8rem;
  border-radius: 1.4rem;
  background-color: ${theme.colors.gray2};
  cursor: pointer;

  ${(props) =>
    props.isEditing &&
    css`
      border: 0.1rem solid ${theme.colors.gray5};
    `}

  ${(props) =>
    props.checked &&
    css`
      border: 0.1rem solid ${theme.colors.primary};
    `}
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: hidden;
  height: 3rem;

  div ~ div {
    margin-left: 1.2rem;
  }
`;

const Content = styled.p`
  ${ellipsis(2)};
  ${theme.fonts.body};
  height: 4.8rem;
  margin: 1.8rem 0 2rem;
  color: ${theme.colors.white};
`;

const ChipContainer = styled.div`
  display: flex;
  align-items: center;

  ${TagList} ~ & {
    margin-top: 2.4rem;
  }
`;

const Arrow = styled.i`
  margin: 0 0.8rem;
`;

const BottomContainer = styled.div`
  display: flex;
`;

const CaptionContainer = styled.div`
  margin-left: auto;
`;

const Caption = styled.span`
  ${theme.fonts.caption1};
  color: ${theme.colors.gray4};

  & ~ & {
    position: relative;
    margin-left: 1.6rem;

    &::before {
      content: '';
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      left: -0.9rem;
      top: 0.6rem;
      background: ${theme.colors.gray4};
    }
  }
`;

const HighlightButton = styled.button`
  ${theme.fonts.caption1};
  color: ${theme.colors.primary};
`;

const CheckboxContainer = styled.div<Pick<PostItemProps, 'checked'>>`
  position: absolute;
  right: 1.8rem;
`;

const Dimmed = styled.div<Pick<PostItemProps, 'checked'>>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1.4rem;

  ${(props) =>
    props.checked &&
    css`
      background-color: ${theme.colors.primary};
      opacity: 0.15;
    `}
`;

export default PostItem;
