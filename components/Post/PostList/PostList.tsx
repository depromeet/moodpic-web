import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PostItem from '@/components/Post/PostItem/PostItem';
import { Post } from '@/shared/type/post';

interface PostListProps {
  postList: Post[];
  isEditing: boolean;
  checkedItems: string[];
  setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const PostList = ({ postList, isEditing, checkedItems, setCheckedItems }: PostListProps) => {
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
      {postList.map((post) => (
        <PostItem
          {...{ post, isEditing }}
          key={post.id}
          checked={isChecked(post.id)}
          onClick={() => handlePostItemClick(post.id)}
        />
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
