import React from 'react';
import { useRouter } from 'next/router';
import {
  CommonAppBar,
  CommonBottomSheetContainer,
  CommonDialog,
  CommonIconButton,
  CommonTagButton,
} from '@/components/Common';
import Card from '@/components/Card/Card';
import { CONTENT_SEPARATOR } from '@/shared/constants/question';
import { NumberTitle, ProvidedQuestionMainTitle, ProvidedQuestionWrap } from '@/components/Question/Question.styles';
import useBottomSheet from '@/hooks/useBottomSheet';
import useDialog from '@/hooks/useDialog';
import useToast from '@/hooks/useToast';
import { useDeletePostMutation, useMemberQuery, usePostByIdQuery } from '@/hooks/apis';
import { useCategoryListQuery } from '@/hooks/apis/post/useCategoryListQuery';
import { ToastType } from '@/shared/type/common';
import { getPrevPath } from '@/shared/utils/storePathValues';
import { CommonTextArea } from '@/components/Common';
import BottomSheetList from '@/components/BottomSheetList/BottomSheetList';
import DialogWarning from '@/components/Dialog/DialogWarning';
import {
  PostDetailContainer,
  TagContainer,
  Description,
  CardContainer,
  MultipleLineText,
  QuestionContainer,
} from '@/components/Post/PostDetail.style';
import PostFloatingButton from '@/components/Post/FloatingButton';
import { commaNumber } from '@/shared/utils/formatter';

const PostDetail = () => {
  const router = useRouter();
  const postId = router.query.postId as string;
  const { dialogVisible, toggleDialog } = useDialog();
  const { calcBottomSheetHeight, toggleSheet, isVisibleSheet } = useBottomSheet();
  const deletePostMutation = useDeletePostMutation();
  const notify = useToast();

  const { data: post } = usePostByIdQuery(postId);
  const { data: categories } = useCategoryListQuery();
  const { data: me } = useMemberQuery();

  const folderId = router.query.folderId ? Number(router.query.folderId) : 0;

  const bottomSheetItems = [
    {
      label: '수정하기',
      onClick: () => {
        router.push(`/posts/${postId}/edit`);
        toggleSheet();
      },
    },
    {
      label: '삭제하기',
      onClick: () => {
        toggleSheet();
        toggleDialog();
      },
    },
  ];

  const getCategoryDescription = (categoryName: string) => {
    if (categories) {
      return Object.values(categories)
        .flat()
        .find((category) => category.categoryName === categoryName)?.description;
    }

    return '';
  };

  // TODO: 오류 페이지 이후 작업 요청해서 바꾸기..
  if (!post || !postId) return <div>404</div>;

  const hasMultipleContent = post.content.includes(CONTENT_SEPARATOR);
  const contents = post.content.split(CONTENT_SEPARATOR);
  const isFromWritePage = getPrevPath() === '/write';

  const onDelete = () => {
    deletePostMutation.mutate([postId], {
      onSuccess: () => {
        router.push(`/posts?folderId=${folderId}`);
        notify({
          type: ToastType.CONFIRM,
          message: '기록이 삭제되었습니다.',
        });
      },
    });
  };

  return (
    <>
      <CommonAppBar>
        {!isFromWritePage && (
          <CommonAppBar.Left>
            <CommonIconButton iconName="left" onClick={() => router.back()} />
          </CommonAppBar.Left>
        )}
        {post.my && (
          <CommonAppBar.Right>
            <CommonIconButton iconName="share" onClick={() => router.push({ pathname: '/share', query: { postId } })} />
            <CommonIconButton iconName="more" onClick={toggleSheet} />
          </CommonAppBar.Right>
        )}
      </CommonAppBar>
      <PostDetailContainer>
        <TagContainer>
          {post.tags.map((tag: string, index: number) => (
            <CommonTagButton key={index}>#{tag}</CommonTagButton>
          ))}
        </TagContainer>
        <CardContainer>
          <Card firstEmotion={post.firstCategory} secondEmotion={post.secondCategory}>
            그땐 {getCategoryDescription(post.firstCategory)}, 지금은 {getCategoryDescription(post.secondCategory)}
          </Card>
        </CardContainer>
        {hasMultipleContent ? (
          <QuestionContainer>
            <ProvidedQuestionWrap>
              <NumberTitle>
                <span>1</span>
                /3
              </NumberTitle>
              <MultipleLineText>
                {me?.nickname}님에게 <br /> 어떤 일이 있었나요?
              </MultipleLineText>
              <CommonTextArea value={contents[0]} height="32.6rem" disabled />
            </ProvidedQuestionWrap>
            <ProvidedQuestionWrap>
              <NumberTitle>
                <span>2</span>
                /3
              </NumberTitle>
              <ProvidedQuestionMainTitle>그 때 어떤 감정이 들었나요?</ProvidedQuestionMainTitle>
              <CommonTextArea value={contents[1]} height="32.6rem" disabled />
            </ProvidedQuestionWrap>
            <ProvidedQuestionWrap>
              <NumberTitle>
                <span>3</span>
                /3
              </NumberTitle>
              <ProvidedQuestionMainTitle>고생했어요! 스스로에게 한마디를 쓴다면?</ProvidedQuestionMainTitle>
              <CommonTextArea value={contents[2]} height="32.6rem" disabled />
            </ProvidedQuestionWrap>
          </QuestionContainer>
        ) : (
          <CommonTextArea value={post.content} height="42.2rem" disabled />
        )}
        <Description>조회수 {commaNumber(post.views)}</Description>
        <Description>{post.createdAt}</Description>
      </PostDetailContainer>
      {isFromWritePage && <PostFloatingButton />}
      {isVisibleSheet && (
        <CommonBottomSheetContainer
          onClose={() => toggleSheet()}
          BottomSheetHeight={calcBottomSheetHeight({ folderSize: bottomSheetItems.length })}
        >
          <BottomSheetList items={bottomSheetItems} />
        </CommonBottomSheetContainer>
      )}
      {dialogVisible && (
        <CommonDialog type="alert" onClose={toggleDialog} onConfirm={onDelete}>
          <DialogWarning>기록을 삭제하시겠습니까?</DialogWarning>
        </CommonDialog>
      )}
    </>
  );
};

export default PostDetail;
