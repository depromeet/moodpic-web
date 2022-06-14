import React, { useCallback, useEffect, ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CONTENT_SEPARATOR } from '@/shared/constants/question';
import { useTypeInput } from '@/hooks/useTypeInput';
import useBottomSheet from '@/hooks/useBottomSheet';
import {
  useCategoryListQuery,
  useCreateFolderMutation,
  useFolderByPostIdQuery,
  useFoldersQuery,
  usePostByIdQuery,
  useUpdatePostMutation,
} from '@/hooks/apis';
import useDialog from '@/hooks/useDialog';
import { useTags } from '@/hooks/post/useTags';
import {
  CommonAppBar,
  CommonIconButton,
  CommonTagButton,
  CommonTextArea,
  CommonTextField,
  CommonToggle,
  CommonDialog,
  CommonFolderButton,
  CommonBottomSheetContainer,
} from '@/components/Common';
import { NumberTitle, ProvidedQuestionMainTitle, QuestionWrap } from '@/components/Question/Question.styles';
import CategorySelector from '@/components/CategorySelector/CategorySelector';
import BottomSheetFolderList from '@/components/BottomSheetFolderList/BottomSheetFolderList';
import BottomSheetCategoryList from '@/components/BottomSheetCategoryList/BottomSheetCategoryList';
import {
  PostDetailContainer,
  Description,
  MultipleLineText,
  QuestionContainer,
} from '@/components/Post/PostDetail.style';
import { TextButton, SelectContainer, SpaceBetweenContainer } from '@/components/Post/PostEdit.style';
import {
  OptionTitle,
  TextFieldWrap,
  TagButtonWrap,
  FolderWrap,
  CustomImage,
} from '@/components/CurrentEmotion/CurrentEmotion.styles';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';
import Whiteadd from 'public/svgs/whiteadd.svg';
import FolderIcon from 'public/svgs/folder.svg';
import FolderPlus from 'public/svgs/folderplus.svg';
import usePostEditForm from '@/hooks/post/usePostEditForm';
import { commaNumber } from '@/shared/utils/formatter';

const PostDetail = () => {
  const router = useRouter();
  const postId = router.query.postId as string;

  const { selectedState, setSelectedState, hasMultipleContent, changePostForm, handleCategoryClick } =
    usePostEditForm();
  const { tagList, tagValue, setTagList, onChangeTagValue, onDeleteTag, onKeyPressEnter, onClickRightSideIcon } =
    useTags();
  const [firstContent, onChangeFirstContent, setFirstContent] = useTypeInput('');
  const [secondContent, onChangeSecondContent, setSecondContent] = useTypeInput('');
  const [thirdContent, onChangeThirdContent, setThirdContent] = useTypeInput('');
  const [folderName, onChangeFolderName] = useTypeInput('');

  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } = useBottomSheet();
  const [bottomSheetType, setBottomSheetType] = useState('');
  const { dialogVisible, toggleDialog } = useDialog();

  const { data: folderListData } = useFoldersQuery();
  const { data: post, refetch: fetchPostById } = usePostByIdQuery(postId);
  const { data: categories } = useCategoryListQuery();
  const { data: folder, refetch: fetchFolderByPostId } = useFolderByPostIdQuery(postId);
  const { mutate: createFolder } = useCreateFolderMutation();
  const { mutate: updatePost } = useUpdatePostMutation();

  const onCreateFolder = useCallback(() => {
    createFolder(folderName, {
      onSuccess: () => {
        toggleDialog();
      },
    });
  }, [createFolder, folderName, toggleDialog]);

  const categoryOptions = categories ? Object.values(categories).flat() : [];

  const getFolderName = (id: number) => folderListData?.folders.find(({ folderId }) => folderId === id)?.folderName;

  const handleEdit = () => {
    const updatedForm = {
      ...selectedState,
      tags: tagList,
      content: [firstContent, secondContent, thirdContent].join(CONTENT_SEPARATOR),
    };

    updatePost(
      { id: postId, postData: { ...updatedForm, folderId: selectedState.folderId || 0 } },
      { onSuccess: () => router.push(`/posts/${postId}`) },
    );
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (selectedState.secondCategory === 'DONTKNOW') {
      !isVisibleSheet && showCategoryBottomSheet();
    }

    fetchPostById();
    fetchFolderByPostId();
  }, [router.isReady, selectedState]);

  useEffect(() => {
    if (post) {
      const { firstCategory, secondCategory, content, tags, disclosure } = post;
      setSelectedState({ firstCategory, secondCategory, content, tags, disclosure, folderId: folder?.folderId });
      setTagList(post?.tags);

      const contents = post.content.split(CONTENT_SEPARATOR);
      if (hasMultipleContent) {
        setFirstContent(contents[0]);
        setSecondContent(contents[1]);
        setThirdContent(contents[2]);
        return;
      }
      setFirstContent(post.content);
    }
  }, [
    post,
    hasMultipleContent,
    setFirstContent,
    setSecondContent,
    setSelectedState,
    setThirdContent,
    setTagList,
    folder,
  ]);

  // TODO: 오류 페이지 이후 작업 요청해서 바꾸기..
  if (!post || !postId) return <div>404</div>;

  const renderAppBar = () => {
    return (
      <CommonAppBar>
        <CommonAppBar.Left>
          <CommonIconButton iconName="close" onClick={() => router.back()} />
        </CommonAppBar.Left>
        <CommonAppBar.Right>
          <TextButton onClick={handleEdit}>완료</TextButton>
        </CommonAppBar.Right>
      </CommonAppBar>
    );
  };

  const isCategoryBottomSheet = bottomSheetType === 'category';
  const bottomSheetHeight = isCategoryBottomSheet ? calcBottomSheetHeight({ folderSize: 4, hasHeader: true }) : 364;
  const headerTitle = isCategoryBottomSheet ? (
    <div>글을 기록한 이후 어떤 감정을 느꼈나요?</div>
  ) : (
    <>
      <Image src={FolderIcon} alt="folderIcon" />
      <div>폴더를 선택해주세요.</div>
    </>
  );

  const showCategoryBottomSheet = () => {
    setBottomSheetType('category');
    toggleSheet();
  };

  const renderBottomSheet = () => {
    return (
      <CommonBottomSheetContainer onClose={toggleSheet} BottomSheetHeight={bottomSheetHeight} headerTitle={headerTitle}>
        {isCategoryBottomSheet ? (
          <BottomSheetCategoryList
            items={categoryOptions}
            selectedItem={selectedState.secondCategory}
            onClick={handleCategoryClick}
          />
        ) : (
          <BottomSheetFolderList
            folderData={folderListData?.folders || []}
            onClose={toggleSheet}
            toggleDialog={toggleDialog}
          />
        )}
      </CommonBottomSheetContainer>
    );
  };

  return (
    <>
      {renderAppBar()}
      <PostDetailContainer>
        <OptionTitle>태그</OptionTitle>
        <TextFieldWrap>
          <CommonTextField
            value={tagValue}
            rightSideIcon={Whiteadd.src}
            hasBorder={false}
            onChange={onChangeTagValue}
            onKeyPress={onKeyPressEnter}
            onClickRightSideIcon={onClickRightSideIcon}
            placeholder="태그를 추가해주세요."
          />
        </TextFieldWrap>
        <TagButtonWrap>
          {tagList.length > 0 ? (
            tagList.map((content, index) => (
              <CommonTagButton canDelete onClick={onDeleteTag(index)} key={content}>
                #{content}
              </CommonTagButton>
            ))
          ) : (
            <CommonTagButton exampleTagMode>#태그는 5개까지 입력 가능해요.</CommonTagButton>
          )}
        </TagButtonWrap>
        <SelectContainer>
          <CategorySelector
            title="기록 이전 감정"
            selectedValue={selectedState.firstCategory}
            options={categoryOptions}
            disabled
          />
          <CategorySelector
            title="기록 이후 감정"
            selectedValue={selectedState.secondCategory}
            options={categoryOptions}
            onClick={showCategoryBottomSheet}
          />
        </SelectContainer>
        {hasMultipleContent ? (
          <QuestionContainer>
            <QuestionWrap>
              <NumberTitle>
                <span>1</span>
                /3
              </NumberTitle>
              <MultipleLineText>
                카톡이름님에게 <br /> 어떤 일이 있었나요?
              </MultipleLineText>
              <CommonTextArea value={firstContent} height="32.6rem" onChange={onChangeFirstContent} />
            </QuestionWrap>
            <QuestionWrap>
              <NumberTitle>
                <span>2</span>
                /3
              </NumberTitle>
              <ProvidedQuestionMainTitle>그 때 어떤 감정이 들었나요?</ProvidedQuestionMainTitle>
              <CommonTextArea value={secondContent} height="32.6rem" onChange={onChangeSecondContent} />
            </QuestionWrap>
            <QuestionWrap>
              <NumberTitle>
                <span>3</span>
                /3
              </NumberTitle>
              <ProvidedQuestionMainTitle>고생했어요! 스스로에게 한마디를 쓴다면?</ProvidedQuestionMainTitle>
              <CommonTextArea value={thirdContent} height="32.6rem" onChange={onChangeThirdContent} />
            </QuestionWrap>
          </QuestionContainer>
        ) : (
          <CommonTextArea value={firstContent} height="42.2rem" onChange={onChangeFirstContent} />
        )}
        <Description>조회수 {commaNumber(post.views)}</Description>
        <Description>{post.createdAt}</Description>
        <SpaceBetweenContainer>
          <OptionTitle>공개</OptionTitle>
          <CommonToggle
            checked={selectedState.disclosure}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changePostForm('disclosure', e.target.checked)}
          />
        </SpaceBetweenContainer>
        <SpaceBetweenContainer>
          <OptionTitle>폴더</OptionTitle>
          <FolderWrap>
            <CommonFolderButton onClick={toggleSheet}>
              {selectedState.folderId ? getFolderName(selectedState.folderId) : '폴더선택'}
            </CommonFolderButton>
            <CustomImage src={FolderPlus} alt="추가" onClick={toggleDialog} />
          </FolderWrap>
        </SpaceBetweenContainer>
        {dialogVisible && (
          <CommonDialog
            type="modal"
            onClose={toggleDialog}
            disabledConfirm={folderName === ''}
            onConfirm={onCreateFolder}
          >
            <DialogFolderForm value={folderName} onChange={onChangeFolderName} />
          </CommonDialog>
        )}
        {isVisibleSheet ? renderBottomSheet() : null}
      </PostDetailContainer>
    </>
  );
};

export default PostDetail;
