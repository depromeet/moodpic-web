import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { ellipsis } from '@/styles/mixins';
import { CommonCheckbox, CommonChipButton, CommonTagButton } from '@/components/Common';
import ArrowRightIcon from 'public/svgs/arrowright.svg';
import { Post } from '@/shared/type/post';
import { CONTENT_SEPARATOR } from '@/shared/constants/question';

export interface PostItemProps {
  post: Post;
  supportsTag?: boolean;
  canEdit?: boolean;
  isMine?: boolean;
  isEditing?: boolean;
  checked?: boolean;
  onClick: () => void;
}

const PostItem = ({
  post: { id, tags, firstCategoryName, secondCategoryName, content, createdAt, views },
  supportsTag = false,
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
      {supportsTag && (
        <TagList>
          {tags.map((tag: string, index: number) => (
            <CommonTagButton key={index}>#{tag}</CommonTagButton>
          ))}
        </TagList>
      )}
      <ChipContainer>
        {isMine && <HighlightButton>MY</HighlightButton>}
        <CommonChipButton>{firstCategoryName}</CommonChipButton>
        <Arrow>
          <Image src={ArrowRightIcon} alt="" width={16} height={16} />
        </Arrow>
        <CommonChipButton>{secondCategoryName}</CommonChipButton>
      </ChipContainer>
      <Content>{firstContent}</Content>
      <CaptionContainer>
        <Caption>{createdAt}</Caption>
        <Caption>조회수 {views}</Caption>
      </CaptionContainer>
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
  margin-bottom: 2.4rem;

  div ~ div {
    margin-left: 1.2rem;
  }
`;

const Content = styled.p`
  ${ellipsis(2)};
  ${theme.fonts.body};
  margin: 1.8rem 0 2rem;
  color: ${theme.colors.white};
`;

const ChipContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Arrow = styled.i`
  margin: 0 0.8rem;
`;

const CaptionContainer = styled.div`
  margin-left: auto;
`;

const Caption = styled.span`
  ${theme.fonts.caption1};
  color: ${theme.colors.gray4};

  & ~ & {
    margin-left: 1.6rem;
  }
`;

const HighlightButton = styled.button`
  ${theme.fonts.caption1};
  margin-right: 1.2rem;
  padding: 0.4rem 0.8rem;
  border-radius: 1.1rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.black};
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

  ${(props) =>
    props.checked &&
    css`
      background-color: ${theme.colors.primary};
      opacity: 0.15;
    `}
`;

export default PostItem;
