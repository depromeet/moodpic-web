import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Letter from '../../public/svgs/letter.svg';
import styled from 'styled-components';
import theme from '../../styles/theme';
import Button from '../../components/Common/Button/Button';
import TextArea from '../../components/Common/TextArea/TextArea';
import { CATEGORY_OPTIONS_INFO } from '../../shared/constants/share';
import CategoryOptionItem from '../../components/Share/CategoryOptionItem/CategoryOptionItem';
import { useRouter } from 'next/router';
import { copyClipboard } from '../../shared/utils/copyClipboard';
import DialogWarning from '../../components/Dialog/DialogWarning';
import { CommonAppBar, CommonDialog, CommonIconButton } from '../../components/Common';
import useModal from '../../hooks/useDialog';
import useToast from '../../hooks/useToast';
import { ToastType } from '../../shared/type/common';
import { useMemberQuery, usePostByIdQuery } from '../../hooks/apis';
import Header from '../../components/Home/Header/Header';
import shareService from '../../service/apis/shareService';
import { getClientBaseUrl } from '../../shared/utils/getBaseUrl';

type SharePageQuery = {
  postId: string;
};

const Share = () => {
  const [receiverName, setReceiverName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORY_OPTIONS_INFO | null>(null);
  const { dialogVisible: isOpenConfirmDialog, toggleDialog: toggleConfirmDialog } = useModal();
  const notify = useToast();

  const router = useRouter();
  const { postId } = router.query as SharePageQuery;

  const { data: post, isLoading: isLoadingPost, refetch: refetchPost } = usePostByIdQuery(postId as string);
  const { data: me, isLoading: isLoadingMe } = useMemberQuery();

  const changeReceiverName = (event: ChangeEvent<HTMLInputElement>) => {
    setReceiverName(event.target.value);
  };

  const changeSelectedCategory = (category: keyof typeof CATEGORY_OPTIONS_INFO) => {
    setSelectedCategory(category);
  };

  const createSharedPostLink = (ldm: string) => {
    const SHARED_POST_PAGE = '/share/post';
    return getClientBaseUrl() + SHARED_POST_PAGE + '/' + ldm;
  };

  const getSharedPostLink = async () => {
    try {
      if (!selectedCategory) return alert('선택해주셔요');
      return await shareService.sharePost({ receiverName, category: selectedCategory, postId });
    } catch (error) {
      alert('404');
    }
  };

  const copySharedPostLink = async () => {
    const sharedPostLdm = await getSharedPostLink();

    // TODO: validate관련 부분 분리 필요
    if (!receiverName) {
      notify({
        type: ToastType.ERROR,
        message: '보내는 사람 이름을 적어주세요.',
      });
      return;
    }

    if (!sharedPostLdm) return alert('404');

    await copyClipboard({
      text: createSharedPostLink(sharedPostLdm),
      onSuccess: () =>
        notify({
          type: ToastType.WARNING,
          message: '링크가 클립보드에 복사됐어요.',
        }),
    });
  };

  useEffect(() => {
    if (postId) {
      refetchPost();
    }
  }, [postId]);

  if (isLoadingPost || isLoadingMe) return <div>로딩중</div>;
  if (!post || !me) return <div>404</div>;

  return (
    <>
      <Header hasOnlyTitle={true} />
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="close" alt="취소" onClick={toggleConfirmDialog} />
        </CommonAppBar.Left>
      </CommonAppBar>
      <BodyContainer>
        <GuideMessage>
          <IconWrap>
            <Image src={Letter} alt="CheckCirclePr" />
          </IconWrap>
          <Message>{me.nickname}님의 감정을 전해보세요.</Message>
        </GuideMessage>
        <SenderInformation>
          <To>To.</To>
          <SenderInput value={receiverName} onChange={changeReceiverName} />
        </SenderInformation>
        <PostContentContainer>
          <TextArea value={post.content} readOnly={true} height={'8rem'} />
        </PostContentContainer>
        <CategorySelectContainer>
          {Object.keys(CATEGORY_OPTIONS_INFO).map((key, index) => {
            const category = key as keyof typeof CATEGORY_OPTIONS_INFO;

            return (
              <CategoryOptionItem
                key={`category-${index}`}
                category={category}
                isSelect={category === selectedCategory}
                onClick={() => changeSelectedCategory(category)}
              />
            );
          })}
        </CategorySelectContainer>
        <SenderInformation>
          <From>From. {me.nickname}</From>
        </SenderInformation>
        {selectedCategory && (
          <ButtonWrapper>
            <Button color="primary" onClick={copySharedPostLink}>
              링크로 감정 공유하기
            </Button>
          </ButtonWrapper>
        )}
        {isOpenConfirmDialog && (
          <CommonDialog type="alert" onClose={toggleConfirmDialog} onConfirm={() => router.push('/')}>
            <DialogWarning description={'작성중인 내용은 삭제됩니다.'}>공유를 취소하시겠어요?</DialogWarning>
          </CommonDialog>
        )}
      </BodyContainer>
    </>
  );
};

const TMP = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const BodyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  gap: 1.2rem;
`;

const IconWrap = styled.div`
  display: flex;
  margin-right: 8px;
  width: 18px;
  height: 18px;
`;

const Message = styled.span`
  ${theme.fonts.h6}
  color: ${theme.colors.white};
`;

const GuideMessage = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const SenderInformation = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 1.8rem;
`;

const PostContentContainer = styled.div`
  height: 8rem;
`;

const CategorySelectContainer = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  flex-flow: row nowrap;
  overflow: auto;
`;

export const To = styled.p`
  ${theme.fonts.h3}
  color: ${theme.colors.white};
`;

export const From = styled.p`
  ${theme.fonts.h3}
  color: ${theme.colors.gray6}
`;

const SenderInput = styled.input`
  margin-left: 0.8rem;
  background: ${theme.colors.gray3};
  border: none;
  background-color: ${theme.colors.black};
  ${theme.fonts.h5}
  color: ${theme.colors.white};
  width: 12rem;
  outline: none;
  border-bottom: 0.1rem solid ${theme.colors.white};

  &:focus {
    border-bottom: 0.1rem solid ${theme.colors.primary};
  }
`;

const ButtonWrapper = styled.div`
  margin: auto 0 80px;
  position: fixed;
  bottom: 8rem;
  width: 100%;
`;

export default Share;
