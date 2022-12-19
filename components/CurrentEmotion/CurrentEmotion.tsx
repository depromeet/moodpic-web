/* eslint-disable max-lines */
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import folderService from '@/service/apis/folderService';
import useInput from '@/hooks/useInput';
import useToast from '@/hooks/useToast';
import useDialog from '@/hooks/useDialog';
import useBottomSheet from '@/hooks/useBottomSheet';
import useUpdateEffect from '@/hooks/useUpdateEffect';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { queryClient } from '@/shared/utils/queryClient';
import { ToastType } from '@/shared/type/common';
import { WriteFormValues } from '@/shared/type/post';
import { ButtonWrapper } from '@/pages/write';
import {
  CommonDialog,
  CommonBottomSheetContainer,
  CommonButton,
  CommonToggle,
  CommonFolderButton,
  CommonTextField,
  CommonTagButton,
} from '@/components/Common';
import BottomSheetFolderList from '@/components/BottomSheetFolderList/BottomSheetFolderList';
import FolderPlus from 'public/svgs/folderplus.svg';
import DialogFolderForm from '@/components/Dialog/DialogFolderForm';
import Whiteadd from 'public/svgs/whiteadd.svg';
import FolderIcon from 'public/svgs/folder.svg';
import {
  OptionWrapper,
  OptionTitle,
  FolderWrap,
  TextFieldWrap,
  TagButtonWrap,
  CustomImage,
} from './CurrentEmotion.styles';
import { useFormContext, useWatch } from 'react-hook-form';

const MAX_TAG_LIST_LENGTH = 5;

const CurrentEmotion = () => {
  const notify = useToast();
  const [tagList, setTagList] = useState<string[]>([]);
  const [selectedFolderName, setSelectFolderName] = useState('폴더선택');
  const [tagValue, onChangeValue, setTagValue] = useInput('');
  const [inputValue, onChangeInput, setInputValue] = useInput('');
  const { setValue, control } = useFormContext<WriteFormValues>();

  const [disclosure, currentFolderId] = useWatch({
    control,
    name: ['disclosure', 'folderId'],
  });

  const { dialogVisible, toggleDialog } = useDialog();
  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } = useBottomSheet();

  const { data: folderListData } = useQuery(QUERY_KEY.GET_FOLDERS, folderService.getFolders);
  const { data: defaultFolder } = useQuery(QUERY_KEY.GET_FOLDERS, folderService.getFolders, {
    select: (data) => data.folders.filter(({ default: isDefaultFolder }) => isDefaultFolder)[0].folderId,
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
    setValue('disclosure', !disclosure);
  };

  const calcDeduplicatedTagList = useCallback(() => {
    const deduplicatedTagList = Array.from(new Set(tagList.concat(tagValue)));
    return [...deduplicatedTagList];
  }, [tagList, tagValue]);

  const setValidTagLogic = useCallback(() => {
    setTagList(calcDeduplicatedTagList);
    setValue('tags', calcDeduplicatedTagList());
    setTagValue('');
  }, [calcDeduplicatedTagList, setTagValue, setValue]);

  const onKeyPressEnter = useCallback(
    (event) => {
      if (event.key === 'Enter' && !!tagValue.trim() && tagList.length < MAX_TAG_LIST_LENGTH) {
        event.preventDefault();
        setValidTagLogic();
      }
    },
    [setValidTagLogic, tagList.length, tagValue],
  );

  const onClickRightSideIcon = useCallback(() => {
    if (tagList.length < MAX_TAG_LIST_LENGTH && !!tagValue.trim()) {
      setValidTagLogic();
    }
  }, [setValidTagLogic, tagList.length, tagValue]);

  const onDeleteTag = useCallback(
    (index: number) => () => {
      setTagList(tagList.filter((_, i: number) => i !== index));
    },
    [tagList],
  );

  const onCreateFolder = () => {
    createFolder(inputValue);
    toggleDialog();
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useUpdateEffect(() => {
    if (folderListData && inputValue) {
      setValue('folderId', folderListData?.folders[folderListData?.folders.length - 1].folderId);
      setInputValue('');
    }
  }, [folderListData?.folders, selectedFolderName]);

  useEffect(() => {
    if (defaultFolder && !isNaN(defaultFolder)) {
      setValue('folderId', defaultFolder);
    }
  }, [defaultFolder, setValue]);

  useEffect(() => {
    if (currentFolderId) {
      setSelectFolderName(
        folderListData?.folders.find(({ folderId }) => folderId === currentFolderId)?.folderName as string,
      );
    }
  }, [currentFolderId]);

  return (
    <>
      <OptionWrapper>
        <OptionTitle>태그</OptionTitle>
        <TextFieldWrap>
          <CommonTextField
            value={tagValue}
            rightSideIcon={Whiteadd.src}
            onChange={onChangeValue}
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
        <div className="space-between">
          <OptionTitle>공개</OptionTitle>
          <CommonToggle checked={disclosure} onChange={onChangeDisclose} />
        </div>
        <div className="space-between">
          <OptionTitle>폴더</OptionTitle>
          <FolderWrap>
            <CommonFolderButton type="button" onClick={toggleSheet}>
              {selectedFolderName}
            </CommonFolderButton>
            <CustomImage src={FolderPlus} alt="FolderPlus" onClick={toggleDialog} />
          </FolderWrap>
        </div>
      </OptionWrapper>
      <ButtonWrapper>
        <CommonButton type="submit" color="primary" size="large" disabled={!currentFolderId}>
          감정기록 완료
        </CommonButton>
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
          bottomSheetHeight={calcBottomSheetHeight({
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
