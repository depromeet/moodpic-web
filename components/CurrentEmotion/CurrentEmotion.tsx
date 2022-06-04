/* eslint-disable max-lines */
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import folderService from '@/service/apis/folderService';
import { createPostRequestState, createPostResponseState } from '@/store/post/atom';
import { useTypeInput } from '@/hooks/useTypeInput';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import useToast from '@/hooks/useToast';
import useDialog from '@/hooks/useDialog';
import useBottomSheet from '@/hooks/useBottomSheet';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { queryClient } from '@/shared/utils/queryClient';
import { ToastType } from '@/shared/type/common';
import { PostRequestType, PostResponseType } from '@/shared/type/post';
import postService from '@/service/apis/postService';

import { ButtonWrapper } from '@/pages/write';
import Button from '../Common/Button/Button';
import SelectButton from '../Common/SelectButton/SecondCategorySelect';
import Toggle from '../Common/Toggle/Toggle';
import FolderButton from '../Common/Tag/FolderButton';
import TextField from '../Common/TextField/TextField';
import TagButton from '../Common/TagButton/TagButton';
import { MainTitle } from '@/components/PreEmotion/PreEmotion';
import { CommonBottomSheetContainer } from '@/components/Common';
import BottomSheetFolderList from '@/components/BottomSheetFolderList/BottomSheetFolderList';
import FolderPlus from 'public/svgs/folderplus.svg';
import { CommonDialog } from '@/components/Common';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';
import Whiteadd from 'public/svgs/whiteadd.svg';
import FolderIcon from 'public/svgs/folder.svg';
import {
  OptionWrapper,
  OptionTitle,
  FolderWrap,
  TextFieldWrap,
  TagButtonWrap,
  Divider,
  CustomImage,
} from './CurrentEmotion.styles';

const MAX_TAG_LIST_LENGTH = 5;

const CurrentEmotion = () => {
  const notify = useToast();
  const nextProgressStep = useNextProgressStep();
  const [isDisclose, setDisclose] = useState(false);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagValue, onChangeValue, setTagValue] = useTypeInput('');
  const [inputValue, onChangeInput, setInputValue] = useTypeInput('');
  const setPostId = useSetRecoilState(createPostResponseState);
  const { dialogVisible, toggleDialog } = useDialog();
  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } = useBottomSheet();
  const [selectedState, setSelectState] = useRecoilState(createPostRequestState);
  const { data: folderListData } = useQuery(QUERY_KEY.GET_FOLDERS, folderService.getFolders);
  const { data: defaultFolder } = useQuery(QUERY_KEY.GET_FOLDERS, folderService.getFolders, {
    select: (data) => data.folders.filter(({ default: isDefaultFolder }) => isDefaultFolder)[0].folderId,
  });
  const { mutate: createPost } = useMutation((postData: PostRequestType) => postService.createPost(postData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_KEY.CREATE_POST);
      nextProgressStep();
      setPostId(data as unknown as PostResponseType);
    },
    onError: (error) => {
      notify({
        type: ToastType.ERROR,
        message: (error as AxiosError).response?.data.msg,
      });
    },
  });
  const { mutate: createFolder } = useMutation((folderName: string) => folderService.createFolder(folderName), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_FOLDERS);
      notify({
        type: ToastType.CONFIRM,
        message: '폴더가 추가되었습니다.',
      });
    },
    onError: (error) => {
      notify({
        type: ToastType.ERROR,
        message: (error as AxiosError).response?.data.msg,
      });
    },
  });

  const onChangeDisclose = () => {
    setSelectState((prev) => ({ ...prev, disclosure: !isDisclose }));
    setDisclose((prev) => !prev);
  };

  const calcDeduplicatedTagList = useCallback(() => {
    const deduplicatedTagList = Array.from(new Set(tagList.concat(tagValue)));
    return [...deduplicatedTagList];
  }, [tagList, tagValue]);

  const onKeyPressEnter = useCallback(
    (event) => {
      if (event.key === 'Enter' && !!tagValue.trim() && tagList.length < MAX_TAG_LIST_LENGTH) {
        setTagList(calcDeduplicatedTagList);
        setSelectState((prev) => ({
          ...prev,
          tags: calcDeduplicatedTagList(),
        }));
        setTagValue('');
      }
    },
    [tagValue, tagList.length, calcDeduplicatedTagList, setSelectState, setTagValue],
  );

  const onClickRightSideIcon = useCallback(() => {
    if (tagList.length < MAX_TAG_LIST_LENGTH && !!tagValue.trim()) {
      setTagList(calcDeduplicatedTagList);
      setTagValue('');
    }
  }, [tagValue, tagList, setTagValue, calcDeduplicatedTagList]);

  const onDeleteTag = useCallback(
    (index: number) => () => {
      setTagList(tagList.filter((_, i: number) => i !== index));
    },
    [tagList],
  );

  const onCreateFolder = useCallback(() => {
    createFolder(inputValue);
    setInputValue('');
    toggleDialog();
  }, [createFolder, inputValue, setInputValue, toggleDialog]);

  const onSubmit = () => {
    createPost(selectedState);
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (defaultFolder && !isNaN(defaultFolder)) {
      setSelectState((prev) => ({ ...prev, folderId: defaultFolder }));
    }
  }, [defaultFolder, setSelectState]);

  return (
    <>
      <MainTitle>
        홍길동님의 <br />
        지금 감정은 어떠세요?
      </MainTitle>
      <SelectButton title="☺️ &nbsp; 한결 나아졌어요" secondaryCategorytype="positive" />
      <SelectButton title="😞 &nbsp; 여전히" secondaryCategorytype="negative" />
      <SelectButton title="🤔 &nbsp; 변화가 없었어요" secondaryCategorytype="natural" />
      <Divider />
      <OptionWrapper>
        <OptionTitle>태그</OptionTitle>
        <TextFieldWrap>
          <TextField
            value={tagValue}
            rightSideIcon={Whiteadd.src}
            hasBorder={false}
            onChange={onChangeValue}
            onKeyPress={onKeyPressEnter}
            onClickRightSideIcon={onClickRightSideIcon}
            placeholder="태그를 추가헤주세요."
          />
        </TextFieldWrap>
        <TagButtonWrap>
          {tagList.length > 0 ? (
            tagList.map((content, index) => (
              <TagButton canDelete onClick={onDeleteTag(index)} key={content}>
                #{content}
              </TagButton>
            ))
          ) : (
            <TagButton exampleTagMode>#태그는 5개까지 입력 가능해요.</TagButton>
          )}
        </TagButtonWrap>
        <div className="space-between">
          <OptionTitle>공개</OptionTitle>
          <Toggle checked={isDisclose} onChange={onChangeDisclose} />
        </div>
        <div className="space-between">
          <OptionTitle>폴더</OptionTitle>
          <FolderWrap>
            <FolderButton onClick={toggleSheet}>폴더선택</FolderButton>
            <CustomImage src={FolderPlus} alt="FolderPlus" onClick={toggleDialog} />
          </FolderWrap>
        </div>
      </OptionWrapper>
      <ButtonWrapper>
        <Button
          color="primary"
          onClick={onSubmit}
          size="large"
          disabled={selectedState.secondCategory === '' || !selectedState.folderId}
        >
          감정기록 완료
        </Button>
      </ButtonWrapper>
      {dialogVisible && (
        <CommonDialog
          type="modal"
          onClose={toggleDialog}
          disabledConfirm={inputValue === ''}
          onConfirm={onCreateFolder}
        >
          <DialogFolderForm value={inputValue} onChange={onChangeInput} />
        </CommonDialog>
      )}
      {isVisibleSheet && folderListData ? (
        <CommonBottomSheetContainer
          onClose={toggleSheet}
          BottomSheetHeight={calcBottomSheetHeight({
            folderSize: folderListData?.folders.length,
            hasHeader: true,
          })}
          headerTitle={
            <>
              <Image src={FolderIcon} alt="folderIcon" />
              <div>변경할 폴더를 선택해주세요.</div>
            </>
          }
        >
          <BottomSheetFolderList
            folderData={folderListData?.folders}
            onClose={toggleSheet}
            toggleDialog={toggleDialog}
          />
        </CommonBottomSheetContainer>
      ) : null}
    </>
  );
};

export default CurrentEmotion;
