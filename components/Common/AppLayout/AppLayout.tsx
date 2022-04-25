import React from 'react';
import { Header } from '@/components/Common';
import { Container, ContainerInner } from './AppLayout.styles';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps): React.ReactElement => {
  return (
    <Container>
      <ContainerInner>
        <Header />
        {children}
      </ContainerInner>
    </Container>
  );
};

export default AppLayout;
