import React from 'react';
import { useRecoilValue } from 'recoil';
import { CommonToast } from '@/components/Common';
import { Container, ContainerInner } from './AppLayout.styles';
import { toastStateAtom } from '@/store/toast/atom';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { dropdownStateAtom } from '@/store/dropdown/atom';
import { progressStepStateAtom } from '@/store/progressStep/atom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps): React.ReactElement => {
  const toastType = useRecoilValue(toastStateAtom);
  const dropdownState = useRecoilValue(dropdownStateAtom);
  const progressStep = useRecoilValue(progressStepStateAtom);

  return (
    <>
      <Container>
        <ContainerInner className={progressStep === 2 ? 'question-page-container' : ''}>
          {dropdownState && <DropdownMenu />}
          {children}
        </ContainerInner>
      </Container>
      <CommonToast type={toastType} />
    </>
  );
};

export default AppLayout;
