import React from 'react';
import { useRouter } from 'next/router';

const LetterDetail = () => {
  const router = useRouter();
  const { letterId } = router.query;

  return <div>편지 상세 페이지 {letterId}</div>;
};

export default LetterDetail;
