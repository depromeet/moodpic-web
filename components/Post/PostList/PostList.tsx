import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import theme from '@/styles/theme';
import PostItem from '@/components/Post/PostItem/PostItem';
import { Post } from '@/shared/type/post';
import Image from 'next/image';
import ListEmpty from 'public/images/list-empty.png';

interface PostListProps {
  postList: Post[];
  isEditing: boolean;
  checkedItems: string[];
  setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
  isMine?: boolean;
}

const PostList = ({ postList = [], isEditing, checkedItems, setCheckedItems, isMine = true }: PostListProps) => {
  const router = useRouter();

  const changeCheckedItems = (postId: string) => {
    if (checkedItems.includes(postId)) {
      setCheckedItems(checkedItems.filter((item) => item !== postId));
      return;
    }

    return setCheckedItems([...checkedItems, postId]);
  };

  const handlePostItemClick = (postId: string) => {
    if (!isEditing) {
      return router.push(`/posts/${postId}`);
    }

    changeCheckedItems(postId);
  };

  const isChecked = (checkedId: string) => checkedItems.includes(checkedId);

  return (
    <PostListContainer>
      {postList.length ? (
        postList.map((post) => (
          <PostItem
            {...{ post, isEditing }}
            key={post.id}
            checked={isChecked(post.id)}
            onClick={() => handlePostItemClick(post.id)}
            isMine={isMine}
          />
        ))
      ) : (
        <EmptyContainer>
          <ImageContainer>
            <Image src={ListEmpty} alt="기록이 없어요." />
          </ImageContainer>
          <GuideMessage>기록이 없어요.</GuideMessage>
        </EmptyContainer>
      )}
    </PostListContainer>
  );
};

const PostListContainer = styled.ul`
  margin: 2rem 0;

  li ~ li {
    margin-top: 1.8rem;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 4.6rem);
`;

const ImageContainer = styled.div`
  width: 7.7rem;
  height: 8.3rem;
  margin-bottom: 0.4rem;
`;

const GuideMessage = styled.p`
  ${theme.fonts.h4};
  margin-top: 1.8rem;
  opacity: 0.7;
  color: ${theme.colors.gray4};
`;

export default PostList;
