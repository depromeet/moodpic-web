import React from 'react';
import { useRouter } from 'next/router';

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  return <div>글 상세 페이지 {postId}</div>;
};

export default PostDetail;
