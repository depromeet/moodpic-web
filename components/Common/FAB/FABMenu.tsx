import { useBlockScroll } from '@/hooks/useBlockModal';
import React, { ReactNode, SyntheticEvent, useRef } from 'react';
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
    writeMode: 'diary',
  },
  {
    imgSrc: SpeechBubble,
    content: '고민을 쓸래요',
    writeMode: 'worry',
  },
] as const;

const FABMenu = ({ isVisible, toggleVisible }: Props) => {
  const FABMenuRef = useRef<HTMLDivElement>(null);
  useBlockScroll(isVisible);

  const onClickFallback = (e: SyntheticEvent) => {
    if (Array.from(FABMenuRef.current?.childNodes as Iterable<ReactNode>).some((v) => v === e.target)) return;
    toggleVisible();
  };

  return (
    <Wrapper ref={FABMenuRef} isVisible={isVisible} onClick={onClickFallback}>
      {FAB_MENU_LIST.map((props, index) => (
        <FABMenuItem key={props.content} index={index} {...props} />
      ))}
    </Wrapper>
  );
};

export default FABMenu;

const Wrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 480px;
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
