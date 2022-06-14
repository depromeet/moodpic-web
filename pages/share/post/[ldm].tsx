import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSharedPostQuery } from '../../../hooks/apis';
import { UserName } from '../index';
import styled from 'styled-components';
import TextArea from '../../../components/Common/TextArea/TextArea';
import Button from '../../../components/Common/Button/Button';
import CategoryBox from '../../../components/Share/CategoryBox/CategoryBox';
import Header from '../../../components/Home/Header/Header';

const SharedPost = () => {
  const router = useRouter();
  const ldm = router.query.ldm as string;

  const { data: sharedPost, isLoading: isLoadingSharedPost, refetch: refetchSharedPost } = useSharedPostQuery(ldm);

  useEffect(() => {
    if (ldm) {
      refetchSharedPost();
    }
  }, [ldm]);

  if (isLoadingSharedPost) return <div>로딩중</div>;
  if (!sharedPost || !ldm) return <div>404</div>;

  const { receiverName, category, content, senderName } = sharedPost;

  return (
    <>
      <Header hasOnlyTitle={true} />
      <Container>
        <UserName>To. {receiverName}</UserName>
        <BodyContainer>
          <CategoryBox category={category} />
          <PostContentContainer>
            <TextArea value={content || 'undefined contents'} readOnly={true} height={'42.2rem'} />
          </PostContentContainer>
        </BodyContainer>
        <UserName>From. {senderName}</UserName>
        <ButtonWrapper>
          <Button color="primary" onClick={() => alert('TODO: 준비중입니다.')}>
            나도 서비스명에서 감정보내기
          </Button>
        </ButtonWrapper>
      </Container>
    </>
  );
};

const BodyContainer = styled.div`
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.3rem;
`;

const PostContentContainer = styled.div`
  margin-top: 2.6rem;
  margin-bottom: 1.4rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 4.6rem;
`;

export default SharedPost;
