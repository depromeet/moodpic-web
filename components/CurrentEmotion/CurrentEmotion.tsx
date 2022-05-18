/* eslint-disable max-lines */
import React, { useCallback, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import { ButtonWrapper } from '@/pages/write';
import { MainTitle } from '@/components/PreEmotion/PreEmotion';
import Button from '../Common/Button/Button';
import SelectButton from '../Common/SelectButton/SecondCategorySelect';
import Toggle from '../Common/Toggle/Toggle';
import FolderButton from '../Common/Tag/FolderButton';
import TextField from '../Common/TextField/TextField';
import { CommonBottomSheetContainer } from '@/components/Common';
import BottomSheetFolderList from '@/components/BottomSheetFolderList/BottomSheetFolderList';
import FolderPlus from 'public/svgs/folderplus.svg';
import useTypeInput from '@/hooks/useTypeInput';
import useInput from '@/hooks/useInput';
import useDialog from '@/hooks/useDialog';
import useBottomSheet from '@/hooks/useBottomSheet';
import TagButton from '../Common/TagButton/TagButton';
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
import { useRecoilValue } from 'recoil';
import { postResponseState } from '@/store/postResponse/atom';

const mockResponse = [
  {
    folderId: 1,
    folderName: '폴더명1',
  },
  {
    folderId: 2,
    folderName: '폴더명2',
  },
  {
    folderId: 3,
    folderName: '폴더명3',
  },
  {
    folderId: 4,
    folderName: '폴더명4',
  },
  {
    folderId: 5,
    folderName: '폴더명5',
  },
  {
    folderId: 6,
    folderName: '폴더명6',
  },
  {
    folderId: 7,
    folderName: '폴더명7',
  },
  {
    folderId: 8,
    folderName: '폴더명8',
  },
  {
    folderId: 9,
    folderName: '폴더명9',
  },
];

const secondCategoryList = {
  z1: [
    { a1: '후회해요1' },
    { a2: '슬퍼요1' },
    { a3: '실망했어요1' },
    { a5: '불안해요1' },
    { a6: '짜증나요1' },
    { a7: '모르겠어요1' },
  ],
  z2: [{ a8: '짜증나요2' }, { a9: '무기력해요1' }, { a10: '모르겠어요2' }],
  z3: [{ a11: '모르겠어요3' }],
};

const MAX_TAG_LIST_LENGTH = 5;

const CurrentEmotion = () => {
  const nextProgressStep = useNextProgressStep();
  const [isDisclose, setDisclose] = useState(true);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagValue, onChangeValue, setTagValue] = useTypeInput('');
  const { inputValue, onChangeInput } = useInput('');
  const { dialogVisible, toggleDialog } = useDialog();
  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } =
    useBottomSheet();
  const selectedState = useRecoilValue(postResponseState);

  const onChangeDisclose = () => {
    setDisclose((prev) => !prev);
  };

  const calcDeduplicatedTagList = useCallback(() => {
    const deduplicatedTagList = Array.from(new Set(tagList.concat(tagValue)));
    return [...deduplicatedTagList];
  }, [tagList, tagValue]);

  const onKeyPressEnter = useCallback(
    (event) => {
      if (
        event.key === 'Enter' &&
        !!tagValue.trim() &&
        tagList.length < MAX_TAG_LIST_LENGTH
      ) {
        setTagList(calcDeduplicatedTagList);
        setTagValue('');
      }
    },
    [tagValue, tagList, setTagValue, calcDeduplicatedTagList],
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

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <MainTitle>
        홍길동님의 <br />
        지금 감정은 어떠세요?
      </MainTitle>
      <SelectButton
        title="☺️ &nbsp; 한결 나아졌어요"
        secondaryCategorytype="positive"
      />
      <SelectButton title="😞 &nbsp; 여전히" secondaryCategorytype="negative" />
      <SelectButton
        title="🤔 &nbsp; 변화가 없었어요"
        secondaryCategorytype="natural"
      />
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
            <CustomImage
              src={FolderPlus}
              alt="FolderPlus"
              onClick={toggleDialog}
            />
          </FolderWrap>
        </div>
      </OptionWrapper>
      <ButtonWrapper>
        <Button
          color="primary"
          onClick={nextProgressStep}
          size="large"
          disabled={selectedState.secondCategory === ''}
        >
          감정기록 완료
        </Button>
      </ButtonWrapper>
      {dialogVisible && (
        <CommonDialog
          type="modal"
          onClose={toggleDialog}
          disabledConfirm={inputValue === ''}
          onConfirm={toggleDialog}
        >
          <DialogFolderForm value={inputValue} onChange={onChangeInput} />
        </CommonDialog>
      )}
      {isVisibleSheet ? (
        <CommonBottomSheetContainer
          onClose={() => toggleSheet()}
          BottomSheetHeight={calcBottomSheetHeight(mockResponse.length)}
          headerTitle={
            <>
              <Image src={FolderIcon} alt="folderIcon" />
              <div>변경할 폴더를 선택해주세요.</div>
            </>
          }
        >
          <BottomSheetFolderList folderData={mockResponse} />
        </CommonBottomSheetContainer>
      ) : null}
    </>
  );
};

export default CurrentEmotion;
