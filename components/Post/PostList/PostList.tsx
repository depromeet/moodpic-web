import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PostItem from '@/components/Post/PostItem/PostItem';
import { Post } from '@/shared/type/post';

interface PostListProps {
  postList: Post[];
  isEditing: boolean;
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
}

const PostList = ({
  postList,
  isEditing,
  checkedItems,
  setCheckedItems,
}: PostListProps) => {
  const router = useRouter();

  const changeCheckedItems = (postId: number) => {
    if (checkedItems.includes(postId)) {
      setCheckedItems(checkedItems.filter((item) => item !== postId));
      return;
    }

    return setCheckedItems([...checkedItems, postId]);
  };

  const handlePostItemClick = (postId: number) => {
    if (!isEditing) {
      return router.push(`/posts/${postId}`);
    }

    changeCheckedItems(postId);
  };

  const isChecked = (checkedId: number) => checkedItems.includes(checkedId);

  return (
    <PostListContainer>
      {postList.map((post) => (
        <li key={post.id}>
          <PostItem
            {...{ post, isEditing }}
            checked={isChecked(post.id)}
            onClick={() => handlePostItemClick(post.id)}
          />
        </li>
      ))}
    </PostListContainer>
  );
};

const PostListContainer = styled.ul`
  margin-top: 2rem;

  li ~ li {
    margin-top: 1.8rem;
  }
`;

export default PostList;
