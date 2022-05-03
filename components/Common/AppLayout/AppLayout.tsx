import React from 'react';
import { useRecoilValue } from 'recoil';
import { CommonHeader, CommonToast } from '@/components/Common';
import { Container, ContainerInner } from './AppLayout.styles';
import { toastStateAtom } from '@/store/toast/atom';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { dropdownStateAtom } from '@/store/dropdown/atom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps): React.ReactElement => {
  const toastType = useRecoilValue(toastStateAtom);
  const dropdownState = useRecoilValue(dropdownStateAtom);

  return (
    <>
      <Container>
        <ContainerInner>
          {dropdownState && <DropdownMenu />}
          <CommonHeader />
          {children}
        </ContainerInner>
      </Container>
      <CommonToast type={toastType} />
    </>
  );
};

export default AppLayout;
