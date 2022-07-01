import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMemberQuery, useSharedPostQuery } from '@/hooks/apis';
import { UserName } from '../index';
import styled from 'styled-components';
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
import Question from '@/components/Post/PostEdit/Question';
import { Post } from '@/shared/type/post';
import { CONTENT_SEPARATOR } from '@/shared/constants/question';

const SharedPost = () => {
  const router = useRouter();
  const ldm = router.query.ldm as string;
  const notify = useToast();
  const { dialogVisible: isOpenConfirmDialog, toggleDialog: toggleConfirmDialog } = useModal();
  const [isSharer, setIsSharer] = useState(false);

  const checkIsSharer = (prevPath: string | null) => {
    const SHARE_PAGE = '/share';
    const POST_DETAIL_PAGE = '/posts/';

    const IS_SHARER = prevPath === SHARE_PAGE || prevPath?.slice(0, 7) === POST_DETAIL_PAGE;

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
        <ButtonContainer>
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
            <ButtonMessage>링크로 감정 공유하기</ButtonMessage>
          </Button>
        </ButtonContainer>
      );
    }

    return (
      <ButtonContainer>
        <Button color="black" onClick={() => router.push('/')}>
          <ButtonMessage>
            나도 무드픽에서 감정보내기
            <IconWrapper>
              <Image src={Right} alt="메뉴" width={24} height={24} />
            </IconWrapper>
          </ButtonMessage>
        </Button>
      </ButtonContainer>
    );
  };

  const renderContent = (content: Post['content']) => {
    const hasMultipleContent = content.includes(CONTENT_SEPARATOR);
    const [firstContent, secondContent, thirdContent] = content.split(CONTENT_SEPARATOR);
    return (
      <Question
        firstContent={firstContent}
        secondContent={secondContent}
        thirdContent={thirdContent}
        hasMultipleContent={hasMultipleContent}
        disabled={true}
      />
    );
  };

  useEffect(() => {
    checkIsSharer(getPrevPath());
  }, []);

  return (
    <>
      <Container>
        {renderHeader()}
        <BodyContainer>
          <UserName>To. {receiverName}</UserName>
          <ContentContainer>
            {category !== 'UNSELECT' && <CategoryBox category={category} />}
            <PostContentContainer>{renderContent(content)}</PostContentContainer>
          </ContentContainer>
          <UserName>From. {senderName}</UserName>
          <ButtonWrapper>{renderButtonByUser()}</ButtonWrapper>
          {isOpenConfirmDialog && (
            <CommonDialog confirmText="확인" type="alert" onClose={toggleConfirmDialog} onConfirm={() => router.back()}>
              <DialogWarning>페이지를 떠나시겠어요?</DialogWarning>
            </CommonDialog>
          )}
        </BodyContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-bottom: 6rem;
`;

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

const ContentContainer = styled.div`
  align-items: center;
  justify-content: center;
`;

const BodyContainer = styled.div`
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

const ButtonContainer = styled.div`
  position: sticky;
  left: 0;
  bottom: 8rem;
  margin-top: auto;
  width: 100%;
  height: 5.5rem;
  &::after {
    position: absolute;
    bottom: -8rem;
    left: 0;
    width: 100%;
    height: 21.2rem;
    content: '';
    background: linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #121212 52.6%);
    z-index: -1;
  }
`;

export default SharedPost;
