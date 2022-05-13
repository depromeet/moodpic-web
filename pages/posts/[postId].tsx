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
import { EMOTION_COLOR_TYPE } from '@/shared/constants/emotion';
import { CONTENT_SEPARATOR } from '@/shared/constants/question';
import {
  NumberTitle,
  ProvidedQuestionMainTitle,
  ProvidedQuestionWrap,
} from '@/components/Question/Question.styles';
import { CommonTextArea } from '@/components/Common';
import useBottomSheet from '@/hooks/useBottomSheet';
import useDialog from '@/hooks/useDialog';
import BottomSheetList from '@/components/BottomSheetList/BottomSheetList';
import DialogWarning from '@/components/Dialog/DialogWarning';
import { PostDetailContainer, TagContainer, Description, CardContainer, MultipleLineText, QuestionContainer } from '@/components/Post/PostDetail.style';

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { dialogVisible, toggleDialog } = useDialog();
  const { calcBottomSheetHeight, toggleSheet, isVisibleSheet } =
    useBottomSheet();

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

  const post = {
    id: 3,
    tags: ['우울해', '대박피곤해', '이거모야', '이거모야', '이거모야'],
    firstCategory: 'SADNESS',
    secondCategory: 'DONTKNOW',
    content:
      '카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나',
    hit: 3333,
    createdAt: '2021년 02월 04일 16:45',
  };

  const hasMultipleContent = post.content.includes(CONTENT_SEPARATOR);
  const contents = post.content.split(CONTENT_SEPARATOR);

  const onDelete = () => {
    console.log('폴더 삭제');
  };

  return (
    <>
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="left" onClick={() => router.back()} />
        </CommonAppBar.Left>
        <CommonAppBar.Right>
          <CommonIconButton iconName="share" />
          <CommonIconButton iconName="more" onClick={toggleSheet} />
        </CommonAppBar.Right>
      </CommonAppBar>
      <PostDetailContainer>
        <TagContainer>
          {post.tags.map((tag, index) => (
            <CommonTagButton key={index}>#{tag}</CommonTagButton>
          ))}
        </TagContainer>
        <CardContainer>
          <Card
            firstColor={EMOTION_COLOR_TYPE[post.firstCategory]}
            secondColor={EMOTION_COLOR_TYPE[post.secondCategory]}
          >
            그땐 {post.firstCategory}, 지금은 {post.secondCategory}
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
                카톡이름님에게 <br /> 어떤 일이 있었나요?
              </MultipleLineText>
              <CommonTextArea value={contents[0]} height="32.6rem" readOnly />
            </ProvidedQuestionWrap>
            <ProvidedQuestionWrap>
              <NumberTitle>
                <span>2</span>
                /3
              </NumberTitle>
              <ProvidedQuestionMainTitle>
                그 때 어떤 감정이 들었나요?
              </ProvidedQuestionMainTitle>
              <CommonTextArea value={contents[1]} height="32.6rem" readOnly />
            </ProvidedQuestionWrap>
            <ProvidedQuestionWrap>
              <NumberTitle>
                <span>3</span>
                /3
              </NumberTitle>
              <ProvidedQuestionMainTitle>
                고생했어요! 스스로에게 한마디를 쓴다면?
              </ProvidedQuestionMainTitle>
              <CommonTextArea value={contents[2]} height="32.6rem" readOnly />
            </ProvidedQuestionWrap>
          </QuestionContainer>
        ) : (
          <CommonTextArea value={post.content} height="42.2rem" readOnly />
        )}
        <Description>조회수 {post.hit}</Description>
        <Description>{post.createdAt}</Description>
      </PostDetailContainer>
      {isVisibleSheet && (
        <CommonBottomSheetContainer
          onClose={() => toggleSheet()}
          BottomSheetHeight={calcBottomSheetHeight(
            bottomSheetItems.length,
            false,
          )}
        >
          <BottomSheetList items={bottomSheetItems} />
        </CommonBottomSheetContainer>
      )}
      {dialogVisible && (
        <CommonDialog type="alert" onClose={toggleDialog} onConfirm={onDelete}>
          <DialogWarning>폴더를 삭제하시겠습니까?</DialogWarning>
        </CommonDialog>
      )}
    </>
  );
};

export default PostDetail;
