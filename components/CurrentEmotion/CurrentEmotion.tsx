import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import useNextProgressStep from '@/hooks/useNextProgressStep';
import { ButtonWrapper } from '@/pages/write';
import { MainTitle } from '@/components/PreEmotion/PreEmotion';
import Button from '../Common/Button/Button';
import SelectButton from '../Common/SelectButton/SelectButton';
import Toggle from '../Common/Toggle/Toggle';
import FolderButton from '../Common/Tag/FolderButton';
import theme from '@/styles/theme';
import FolderPlus from 'public/svgs/folderplus.svg';

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

const CurrentEmotion = () => {
  const nextProgressStep = useNextProgressStep();
  const [isDisclose, setDisclose] = useState(false);

  const onChangeDisclose = () => {
    setDisclose((prev) => !prev);
  };

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

      <ButtonWrapper>
        <OptionWrapper>
          <div>
            <OptionTitle>공개</OptionTitle>
            <Toggle checked={isDisclose} onChange={onChangeDisclose} />
          </div>
          <div>
            <OptionTitle>폴더</OptionTitle>
            <FolderWrap>
              <FolderButton>폴더선택</FolderButton>
              <CustomImage src={FolderPlus} alt="FolderPlus" />
            </FolderWrap>
          </div>
        </OptionWrapper>
        <Button color="gray" onClick={nextProgressStep} size="large">
          감정기록 완료
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default CurrentEmotion;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
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

const CustomImage = styled(Image)`
  cursor: pointer;
`;
