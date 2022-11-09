import React from 'react';
import { ButtonContainer } from './WritingButton.styles';
import Icon from './Icon';
import FABPortal from './FABPortal';
import { useToggleState } from '@/hooks/useToggleState';
import FABMenu from './FABMenu';

const WritingButton = () => {
  const [isVisible, toggleVisible] = useToggleState(false);

  return (
    <>
      <ButtonContainer onClick={toggleVisible}>
        <Icon isVisible={isVisible} />
      </ButtonContainer>

      {/* TODO: 버튼 토글했을때 디졸브 효과도 적용되도록 리팩토링 */}
      {isVisible && (
        <FABPortal>
          <FABMenu isVisible={isVisible} toggleVisible={toggleVisible} />
        </FABPortal>
      )}
    </>
  );
};

export default WritingButton;
