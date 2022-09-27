import React, { useEffect } from 'react';

const AppleAuth = () => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.hash.slice(1));

    // TODO: API 호출하고, 성공하면 router.replace / API가 실패하면 로그인 + 에러메세지
    console.log(urlSearchParams.get('id_token'));
  }, []);

  return <div />;
};

export default AppleAuth;
