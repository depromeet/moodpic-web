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
import DialogWarning from '@/components/Dialog/DialogWarning';
import { CommonAppBar, CommonDialog, CommonIconButton, LogoHeader } from '@/components/Common';
import useModal from '@/hooks/useDialog';
import Image from 'next/image';
import Right from '@/public/svgs/right.svg';
import theme from '@/styles/theme';
import { getPrevPath } from '@/shared/utils/storePathValues';

const SharedPost = () => {
  const router = useRouter();
  const ldm = router.query.ldm as string;
  const notify = useToast();
  const { dialogVisible: isOpenConfirmDialog, toggleDialog: toggleConfirmDialog } = useModal();
  const [isSharer, setIsSharer] = useState(false);

  const { data: sharedPost, isLoading: isLoadingSharedPost, refetch: refetchSharedPost } = useSharedPostQuery(ldm);

  const checkIsSharer = (prevPath: string | null) => {
    const SHARE_PAGE = '/share';
    const POST_DETAIL_PAGE = '/share/post/';

    const IS_SHARER = prevPath === SHARE_PAGE || prevPath?.slice(0, 12) === POST_DETAIL_PAGE;

    setIsSharer(IS_SHARER);
  };

  const renderHeader = () => {
    if (isSharer) {
      return (
        <CommonAppBar>
          <CommonAppBar.Left>
            <CommonIconButton iconName="left" alt="이전" onClick={() => router.back()} />
          </CommonAppBar.Left>
          <CommonAppBar.Right>
            <CommonIconButton iconName="close" alt="취소" onClick={toggleConfirmDialog} />
          </CommonAppBar.Right>
        </CommonAppBar>
      );
    } else {
      return (
        <HeadWrapper>
          <LogoHeader onClickLogo={() => router.push('/')} />
        </HeadWrapper>
      );
    }
  };

  const renderButtonByUser = () => {
    if (isSharer) {
      return (
        <ButtonWrapper>
          <Button
            color="black"
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
            <ButtonMessage>링크로 감정 공유하기</ButtonMessage>
          </Button>
        </ButtonWrapper>
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
      checkIsSharer(getPrevPath());
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
        <UserName>To. {receiverName}</UserName>
        <BodyContainer>
          {category !== 'UNSELECT' && <CategoryBox category={category} />}
          <PostContentContainer>
            <TextArea value={content || 'undefined contents'} disabled={true} height={'32.6rem'} />
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

const ButtonWrapperr = styled.div`
  position: sticky;
  bottom: 2.8rem;
  margin-top: auto;
  &::after {
    position: absolute;
    bottom: -2.8rem;
    left: 0;
    width: 100%;
    height: 16rem;
    content: '';
    background: linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #121212 52.6%);
    z-index: -1;
  }
`;

const HeadWrapper = styled.div`
  margin-top: 0.9rem;
`;

const ButtonMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${theme.fonts.btn1}
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
  margin: auto 0 3.6rem;
  position: fixed;
  max-width: 44.4rem;
  width: calc(100% - 3.6rem);
  bottom: 0;
`;

export default SharedPost;
