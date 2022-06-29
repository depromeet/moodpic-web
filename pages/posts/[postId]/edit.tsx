/* eslint-disable max-lines */
import React, { useCallback, useEffect, ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CONTENT_SEPARATOR } from '@/shared/constants/question';
import { useInput } from '@/hooks/useInput';
import useBottomSheet from '@/hooks/useBottomSheet';
import {
  useCategoryListQuery,
  useCreateFolderMutation,
  useFolderByPostIdQuery,
  useFoldersQuery,
  useMemberQuery,
  usePostByIdQuery,
  useUpdatePostMutation,
} from '@/hooks/apis';
import useDialog from '@/hooks/useDialog';
import { useTags } from '@/hooks/post/useTags';
import useSystemDialog from '@/hooks/useSystemDialog';
import { formatDatetime } from '@/shared/utils/date';
import {
  CommonTagButton,
  CommonTextField,
  CommonToggle,
  CommonDialog,
  CommonFolderButton,
  CommonBottomSheetContainer,
} from '@/components/Common';
import CategorySelector from '@/components/CategorySelector/CategorySelector';
import BottomSheetFolderList from '@/components/BottomSheetFolderList/BottomSheetFolderList';
import BottomSheetCategoryList from '@/components/BottomSheetCategoryList/BottomSheetCategoryList';
import { PostDetailContainer, Description } from '@/components/Post/PostDetail.style';
import PostEditAppBar from '@/components/Post/PostEdit/AppBar';
import { SelectContainer, SpaceBetweenContainer } from '@/components/Post/PostEdit/PostEdit.style';
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
import useToast from '@/hooks/useToast';
import { useIsMounted } from '@/hooks/useIsMounted';
import { commaNumber } from '@/shared/utils/formatter';
import { ToastType } from '@/shared/type/common';
import DialogDelete from '@/components/Dialog/DialogDelete';
import Question from '@/components/Post/PostEdit/Question';

const PostDetail = () => {
  const router = useRouter();
  const postId = router.query.postId as string;
  const isMounted = useIsMounted();

  const { selectedState, setSelectedState, hasMultipleContent, changePostForm } = usePostEditForm();
  const { tagList, tagValue, setTagList, onChangeTagValue, onDeleteTag, onKeyPressEnter, onClickRightSideIcon } =
    useTags();
  const [firstContent, onChangeFirstContent, setFirstContent] = useInput('');
  const [secondContent, onChangeSecondContent, setSecondContent] = useInput('');
  const [thirdContent, onChangeThirdContent, setThirdContent] = useInput('');
  const [folderName, onChangeFolderName, setFolderName] = useInput('');

  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } = useBottomSheet();
  const [bottomSheetType, setBottomSheetType] = useState('');
  const { dialogVisible, toggleDialog } = useDialog();
  const [dialogType, setDialogType] = useState('');

  const { data: folderListData } = useFoldersQuery();
  const { data: post, refetch: fetchPostById } = usePostByIdQuery(postId);
  const { data: categories } = useCategoryListQuery();
  const { data: folder, refetch: fetchFolderByPostId } = useFolderByPostIdQuery(postId);
  const { data: me } = useMemberQuery();
  const { mutate: createFolder } = useCreateFolderMutation();
  const { mutate: updatePost } = useUpdatePostMutation();
  const { confirmSystemDialog, cancelSystemDialog, removeRouteChangeEvent } = useSystemDialog(() => {
    toggleDialog();
    setDialogType('cancel');
  });
  const notify = useToast();

  const handleCategoryClick = (categoryName: string) => {
    changePostForm('secondCategory', categoryName);
    toggleSheet();
  };

  const onCreateFolder = useCallback(() => {
    createFolder(folderName, {
      onSuccess: (res) => {
        toggleDialog();
        setFolderName('');
        setSelectedState({ ...selectedState, folderId: res.folderId });
      },
    });
  }, [createFolder, folderName, toggleDialog]);

  const categoryOptions = categories ? Object.values(categories).flat() : [];
  const selectedFolderName = folderListData?.folders.find(
    ({ folderId }) => folderId === selectedState.folderId,
  )?.folderName;

  const handleEdit = () => {
    const updatedForm = {
      ...selectedState,
      tags: tagList,
      content: hasMultipleContent ? [firstContent, secondContent, thirdContent].join(CONTENT_SEPARATOR) : firstContent,
    };

    updatePost(
      { id: postId, postData: { ...updatedForm, folderId: selectedState.folderId || 0 } },
      {
        onSuccess: () => {
          router.replace(`/posts/${postId}`);
          notify({
            type: ToastType.CONFIRM,
            message: '기록 수정이 완료되었습니다.',
          });
        },
      },
    );

    removeRouteChangeEvent();
  };

  const toggleCreateDialog = () => {
    setDialogType('folder');
    toggleDialog();
  };

  useEffect(() => {
    if (!isMounted) return;

    if (selectedState.secondCategory === 'DONTKNOW') {
      !isVisibleSheet && showBottomSheetByType('category');
    }

    fetchPostById();
    fetchFolderByPostId();
  }, [isMounted]);

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
  }, [post, hasMultipleContent, folder]);

  if (!post || !postId) return <div>404</div>;

  const isCategoryBottomSheet = bottomSheetType === 'category';
  const bottomSheetHeight = isCategoryBottomSheet ? 375 : calcBottomSheetHeight({ folderSize: 4, hasHeader: true });
  const headerTitle = isCategoryBottomSheet ? (
    <div>글을 기록한 이후 어떤 감정을 느꼈나요?</div>
  ) : (
    <>
      <Image src={FolderIcon} alt="folderIcon" />
      <div>폴더를 선택해주세요.</div>
    </>
  );

  const showBottomSheetByType = (type: string) => {
    setBottomSheetType(type);
    toggleSheet();
  };

  const renderBottomSheet = () => {
    return (
      <CommonBottomSheetContainer onClose={toggleSheet} bottomSheetHeight={bottomSheetHeight} headerTitle={headerTitle}>
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
            toggleDialog={toggleCreateDialog}
          />
        )}
      </CommonBottomSheetContainer>
    );
  };

  const renderSystemDialog = () => {
    return (
      <CommonDialog type="alert" onClose={cancelSystemDialog} onConfirm={confirmSystemDialog}>
        <DialogDelete />
      </CommonDialog>
    );
  };

  const renderDialog = () => {
    return (
      <CommonDialog type="modal" onClose={toggleDialog} disabledConfirm={folderName === ''} onConfirm={onCreateFolder}>
        <DialogFolderForm value={folderName} onChange={onChangeFolderName} />
      </CommonDialog>
    );
  };

  return (
    <>
      <PostEditAppBar onSubmit={handleEdit} />
      <PostDetailContainer>
        <OptionTitle>태그</OptionTitle>
        <TextFieldWrap>
          <CommonTextField
            value={tagValue}
            rightSideIcon={Whiteadd.src}
            onChange={onChangeTagValue}
            onKeyPress={onKeyPressEnter}
            hasRightSideIcon={true}
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
            onClick={() => showBottomSheetByType('category')}
          />
        </SelectContainer>
        <Question
          nickname={me?.nickname || ''}
          hasMultipleContent={hasMultipleContent}
          firstContent={firstContent}
          secondContent={secondContent}
          thirdContent={thirdContent}
          onChangeFirstContent={onChangeFirstContent}
          onChangeSecondContent={onChangeSecondContent}
          onChangeThirdContent={onChangeThirdContent}
        />
        <Description>조회수 {commaNumber(post.views)}</Description>
        <Description>{formatDatetime(post.createdAt)}</Description>
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
            <CommonFolderButton onClick={() => showBottomSheetByType('folder')}>
              {selectedFolderName}
            </CommonFolderButton>
            <CustomImage src={FolderPlus} alt="추가" onClick={toggleCreateDialog} />
          </FolderWrap>
        </SpaceBetweenContainer>
        {dialogVisible && dialogType === 'folder' && renderDialog()}
        {dialogVisible && dialogType !== 'folder' && renderSystemDialog()}
        {isVisibleSheet && renderBottomSheet()}
      </PostDetailContainer>
    </>
  );
};

export default PostDetail;
