import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSharedPostQuery } from '@/hooks/apis';
import { UserName } from '../index';
import styled from 'styled-components';
import TextArea from '@/components/Common/TextArea/TextArea';
import Button from '@/components/Common/Button/Button';
import CategoryBox from '@/components/Share/CategoryBox/CategoryBox';
import { copyClipboard } from '@/shared/utils/copyClipboard';
import useToast from '@/hooks/useToast';
import { ToastType } from '@/shared/type/common';
import NavHeader from '@/components/TagSearch/NavHeader/NavHeader';
import DialogWarning from '@/components/Dialog/DialogWarning';
import { CommonDialog, LogoHeader } from '@/components/Common';
import useModal from '@/hooks/useDialog';
import { getPrevPath } from '@/shared/utils/storePathValues';
import Image from 'next/image';
import Right from '@/public/svgs/right.svg';
import Head from 'next/head';

const SharedPost = () => {
  const router = useRouter();
  const ldm = router.query.ldm as string;
  const notify = useToast();
  const { dialogVisible: isOpenConfirmDialog, toggleDialog: toggleConfirmDialog } = useModal();
  const [isSharer, setIsSharer] = useState(false);

  const { data: sharedPost, isLoading: isLoadingSharedPost, refetch: refetchSharedPost } = useSharedPostQuery(ldm);
  const checkUserType = () => {
    const SHARE_PAGE = '/share';
    setIsSharer(getPrevPath() === SHARE_PAGE);
  };
  const renderHeader = () => {
    if (isSharer) {
      return <NavHeader onClickLeftIcon={toggleConfirmDialog} />;
    } else {
      return <LogoHeader onClickLogo={() => router.push('/')} />;
    }
  };

  const renderButtonByUser = () => {
    if (isSharer) {
      return (
        <Button
          color="primary"
          onClick={async () => {
            await copyClipboard({
              text: window.document.location.href,
              onSuccess: () => {
                notify({
                  type: ToastType.CONFIRM,
                  message: '링크가 클립보드에 복사됐어요.',
                });
              },
            });
          }}
        >
          링크로 감정 공유하기
        </Button>
      );
    }

    return (
      <Button color="black" onClick={() => router.push('/')}>
        <ButtonMessage>
          나도 무드픽에서 감정보내기
          <IconWrapper>
            <Image src={Right} alt="메뉴" width={24} height={24} />
          </IconWrapper>
        </ButtonMessage>
      </Button>
    );
  };

  useEffect(() => {
    if (ldm) {
      checkUserType();
      refetchSharedPost();
    }
  }, [ldm]);

  if (isLoadingSharedPost) return <div>로딩중</div>;
  if (!sharedPost || !ldm) return <div>404</div>;

  const { receiverName, category, content, senderName } = sharedPost;

  return (
    <>
      {renderHeader()}
      <Container>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, maximum-sacle=1.0, mininum-scale=1.0"
          />
          <title>나만의 감정 기록 보관소, moodpic</title>
        </Head>
        <UserName>To. {receiverName}</UserName>
        <BodyContainer>
          {category !== 'UNSELECT' && <CategoryBox category={category} />}
          <PostContentContainer>
            <TextArea value={content || 'undefined contents'} readOnly={true} height={'32.6rem'} />
          </PostContentContainer>
        </BodyContainer>
        <UserName>From. {senderName}</UserName>
        <ButtonWrapper>{renderButtonByUser()}</ButtonWrapper>
        {isOpenConfirmDialog && (
          <CommonDialog confirmText="확인" type="alert" onClose={toggleConfirmDialog} onConfirm={() => router.back()}>
            <DialogWarning>페이지를 떠나시겠어요?</DialogWarning>
          </CommonDialog>
        )}
      </Container>
    </>
  );
};

const ButtonMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const BodyContainer = styled.div`
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const PostContentContainer = styled.div`
  margin-top: 2.6rem;
  margin-bottom: 1.4rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 4.6rem;
`;

export default SharedPost;
