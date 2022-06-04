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
import { CommonDialog } from '../../components/Common';
import useModal from '../../hooks/useDialog';
import useToast from '../../hooks/useToast';
import { ToastType } from '../../shared/type/common';
import { usePostByIdQuery } from '../../hooks/apis';
import Header from '../../components/Home/Header/Header';
import shareService from '../../service/apis/shareService';

const Share = () => {
  const [receiverName, setReceiverName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORY_OPTIONS_INFO | null>(null);
  const { dialogVisible: isOpenConfirmDialog, toggleDialog: toggleConfirmDialog } = useModal();
  const notify = useToast();

  const router = useRouter();
  const { postId, senderName } = router.query as { postId: string; senderName: string };

  const { data: post, isLoading: isLoadingPost } = usePostByIdQuery(postId as string);

  const changeReceiverName = (event: ChangeEvent<HTMLInputElement>) => {
    setReceiverName(event.target.value);
  };

  const changeSelectedCategory = (category: keyof typeof CATEGORY_OPTIONS_INFO) => {
    setSelectedCategory(category);
  };

  const getSharedPostLink = async () => {
    try {
      if (!selectedCategory) return alert('선택해주셔요');
      const { data } = await shareService.sharePost({ receiverName, category: selectedCategory, postId });
      return 'mockTmpLink';
    } catch (error) {
      // TODO: 404로 보내기
      console.log(error);
    }
  };

  const onShareConfirm = async () => {
    const sharedPostLink = await getSharedPostLink();

    if (!receiverName) {
      notify({
        type: ToastType.ERROR,
        message: '보내는 사람 이름을 적어주세요(수정 필요)',
      });

      return;
    }

    if (!sharedPostLink) return alert('go to 404');

    await copyClipboard({
      text: sharedPostLink,
      onSuccess: () =>
        notify({
          type: ToastType.WARNING,
          message: '링크가 클립보드에 복사됐어요.',
        }),
    });
  };

  if (isLoadingPost) return <div>로딩중</div>;
  if (!post || !senderName) return <div>404</div>;

  return (
    <>
      <Header hasOnlyTitle={true} />

      <Container>
        <GuideMessage>
          <IconWrap>
            <Image src={Letter} alt="CheckCirclePr" />
          </IconWrap>
          <Message>{'senderName'}님의 감정을 전해보세요.</Message>
        </GuideMessage>
        <SenderInformation>
          <To>To.</To>
          <SenderInput value={receiverName} onChange={changeReceiverName} />
        </SenderInformation>
        <PostContentContainer>
          <TextArea value={post?.content || 'undefined contents'} readOnly={true} height={'8rem'} />
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
          <From>From. {senderName}</From>
        </SenderInformation>
        {selectedCategory && (
          <ButtonWrapper>
            <Button color="primary" onClick={onShareConfirm}>
              링크로 감정 공유하기
            </Button>
          </ButtonWrapper>
        )}
        {isOpenConfirmDialog && (
          <CommonDialog type="alert" onClose={toggleConfirmDialog} onConfirm={() => router.back()}>
            <DialogWarning>폴더를 삭제하시겠습니까?</DialogWarning>
          </CommonDialog>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
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
`;

const SenderInformation = styled.div`
  display: flex;
`;

const PostContentContainer = styled.div`
  height: 8rem;
`;

const CategorySelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const To = styled.p`
  ${theme.fonts.h3}
  color: ${theme.colors.white}
`;

export const From = styled.p`
  ${theme.fonts.h3}
  color: ${theme.colors.gray6}
`;

const SenderInput = styled.input`
  margin-left: 0.8rem;
  background: ${theme.colors.gray3};
  border: none;
  border-bottom: 0.1rem solid ${theme.colors.primary};
  background-color: ${theme.colors.black};
  ${theme.fonts.h5}
  color: ${theme.colors.white};
  width: 12rem;
`;

const ButtonWrapper = styled.div`
  margin: auto 0 80px;
`;

export default Share;
