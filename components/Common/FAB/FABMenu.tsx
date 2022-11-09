import { useBlockScroll } from '@/hooks/useBlockModal';
import React from 'react';
import styled, { css } from 'styled-components';
import FABMenuItem from './FABMenuItem';
import Diary from 'public/images/diary.png';
import SpeechBubble from 'public/images/speechBubble.png';

interface Props {
  isVisible: boolean;
  toggleVisible: () => void;
}

const FAB_MENU_LIST = [
  {
    imgSrc: Diary,
    content: '일기를 쓸래요',
  },
  {
    imgSrc: SpeechBubble,
    content: '고민을 쓸래요',
  },
];

const FABMenu = ({ isVisible, toggleVisible }: Props) => {
  useBlockScroll(isVisible);

  const onClickFallback = () => {
    toggleVisible();
  };

  return (
    <Wrapper isVisible={isVisible} onClick={onClickFallback}>
      {FAB_MENU_LIST.map(({ content, imgSrc }, index) => (
        <FABMenuItem key={content} content={content} imgSrc={imgSrc} index={index} />
      ))}
    </Wrapper>
  );
};

export default FABMenu;

const Wrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease;
  z-index: 102;
  ${({ isVisible }) =>
    isVisible &&
    css`
      background: rgba(0, 0, 0, 0.6);
    `}
`;
