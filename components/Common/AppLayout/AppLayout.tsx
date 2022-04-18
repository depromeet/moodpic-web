import React from 'react';
import { AppProps } from 'next/app';
import { Container, ContainerInner } from './AppLayout.styles';

interface AppLayoutProps {
  children: AppProps | React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps): React.ReactElement => {
  return (
    <Container>
      <ContainerInner>{children}</ContainerInner>
    </Container>
  );
};

export default AppLayout;
