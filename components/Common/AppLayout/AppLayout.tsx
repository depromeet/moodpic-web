import React from 'react';
import { Header } from '@/components/Common';
import { Toast } from '@/components/Common';
import { Container, ContainerInner } from './AppLayout.styles';
import { toastStateAtom } from '@/store/toast/atom';
import { useRecoilValue } from 'recoil';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps): React.ReactElement => {
  const toastType = useRecoilValue(toastStateAtom);
  return (
    <>
      <Container>
        <ContainerInner>
          <Header />
          {children}
        </ContainerInner>
      </Container>
      <Toast type={toastType} />
    </>
  );
};

export default AppLayout;
