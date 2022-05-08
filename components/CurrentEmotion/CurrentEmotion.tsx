import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import { ButtonWrapper } from '@/pages/write';
import { MainTitle } from '@/components/PreEmotion/PreEmotion';
import Button from '../Common/Button/Button';
import SelectButton from '../Common/SelectButton/SelectButton';
import Toggle from '../Common/Toggle/Toggle';
import FolderButton from '../Common/Tag/FolderButton';
import TextField from '../Common/TextField/TextField';
import theme from '@/styles/theme';
import FolderPlus from 'public/svgs/folderplus.svg';
import useInput from '@/hooks/useTypeInput';
import TagButton from '../Common/TagButton/TagButton';
import Whiteadd from 'public/svgs/whiteadd.svg';

const getBetterEmotionList = [
  '기뻐요',
  '뿌듯해요',
  '안도돼요',
  '홀가분해요',
  '차분해요',
];
const stillEmotionList = [
  '후회해요',
  '슬퍼요',
  '실망했어요',
  '무기력해요',
  '불안해요',
  '짜증나요',
];
const noChangeEmotionList = ['모르겠어요'];

const MAX_TAG_LIST_LENGTH = 5;

const CurrentEmotion = () => {
  const nextProgressStep = useNextProgressStep();
  const [isDisclose, setDisclose] = useState(true);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagValue, onChangeValue, setTagValue] = useInput('');

  const onChangeDisclose = () => {
    setDisclose((prev) => !prev);
  };

  const onKeyPressEnter = useCallback(
    (event) => {
      if (
        event.key === 'Enter' &&
        !!tagValue.trim() &&
        tagList.length < MAX_TAG_LIST_LENGTH
      ) {
        const deduplicatedTagList = new Set(tagList.concat(tagValue));
        setTagList([...Array.from(deduplicatedTagList)]);
        setTagValue('');
      }
    },
    [tagValue, tagList, setTagValue],
  );

  const onClickRightSideIcon = useCallback(() => {
    if (tagList.length < MAX_TAG_LIST_LENGTH && !!tagValue.trim()) {
      const deduplicatedTagList = new Set(tagList.concat(tagValue));
      setTagList([...Array.from(deduplicatedTagList)]);
      setTagValue('');
    }
  }, [tagValue, tagList, setTagValue]);

  const onDeleteTag = useCallback(
    (index: number) => () => {
      setTagList(tagList.filter((_, i: number) => i !== index));
    },
    [tagList],
  );

  return (
    <>
      <MainTitle>
        홍길동님의 <br />
        지금 감정은 어떠세요?
      </MainTitle>

      <SelectButton
        emotionList={getBetterEmotionList}
        title="☺️ &nbsp; 한결 나아졌어요"
      />
      <SelectButton emotionList={stillEmotionList} title="😞 &nbsp; 여전히" />
      <SelectButton
        emotionList={noChangeEmotionList}
        title="🤔 &nbsp; 변화가 없었어요"
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
            <FolderButton>폴더선택</FolderButton>
            <CustomImage src={FolderPlus} alt="FolderPlus" />
          </FolderWrap>
        </div>
      </OptionWrapper>
      <ButtonWrapper>
        <Button color="gray" onClick={nextProgressStep} size="large">
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default CurrentEmotion;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div.space-between {
    display: flex;
    justify-content: space-between;
    margin-bottom: 36px;
    & > span {
      ${theme.fonts.caption1};
    }
  }
  & > div:last-child {
    margin-bottom: 40px;
  }
`;

const OptionTitle = styled.div`
  ${theme.fonts.h4}
  font-weight: bold;
  line-height: 1.8rem;
  color: ${theme.colors.white};
`;

const FolderWrap = styled.div`
  display: flex;
  & > button {
    margin-right: 28px;
  }
`;

const TextFieldWrap = styled.div`
  margin: 13px 0 24px;
`;

const TagButtonWrap = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 50px;
`;

const Divider = styled.div`
  width: calc(100% + 36px);
  height: 6px;
  background-color: ${theme.colors.gray1};
  margin-bottom: 40px;
  transform: translateX(-18px);
`;

const CustomImage = styled(Image)`
  cursor: pointer;
`;
