import React from 'react';
import { createPortal } from 'react-dom';
import { useAnimation } from '@/hooks/useAnimation';

import CloseIcon from 'public/svgs/close.svg';

import {
  BottomSheetWrapper,
  BottomSheetWrap,
  BottomSheetDimmed,
  BottomSheetInner,
  BottomSheetHeader,
  CustomImage,
} from './BottomSheetContainer.styles';

interface BottomSheetProps {
  children: React.ReactNode;
  onClose: () => void;
  BottomSheetHeight: number;
  headerTitle?: React.ReactNode;
}

/**
 * @notice
 * - 부모 컴포넌트에서 height를 계산해줘야함
 * - padding은 자연스러운 애니메이션을 위해 콘텐츠들에서 패딩을 확보해줘야함
 */

const BottomSheetContainer = ({
  children,
  onClose,
  BottomSheetHeight,
  headerTitle,
}: BottomSheetProps) => {
  const { opacityAnimation, heightAnimation, setPrevClose } = useAnimation({
    onClose,
    fullHeight: BottomSheetHeight,
  });

  const bottomSheetRef =
    typeof window !== 'undefined' &&
    document.getElementById('root-bottomsheet');

  const closeModal = () => {
    setPrevClose(true);
  };

  if (!bottomSheetRef) return null;

  return createPortal(
    <BottomSheetWrapper>
      <BottomSheetDimmed style={opacityAnimation} onClick={closeModal} />
      <BottomSheetWrap onClick={closeModal}>
        <BottomSheetInner style={heightAnimation}>
          {headerTitle ? (
            <BottomSheetHeader>
              <div>{headerTitle}</div>
              <CustomImage
                src={CloseIcon}
                alt="closeIcon"
                onClick={closeModal}
              />
            </BottomSheetHeader>
          ) : null}
          {children}
        </BottomSheetInner>
      </BottomSheetWrap>
    </BottomSheetWrapper>,
    bottomSheetRef,
  );
};

export default BottomSheetContainer;
