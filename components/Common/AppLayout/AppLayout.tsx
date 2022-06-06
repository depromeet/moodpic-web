import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { storePathValues } from '@/shared/utils/storePathValues';
import { useRouter } from 'next/router';
import { CommonToast } from '@/components/Common';
import { Container, ContainerInner } from './AppLayout.styles';
import { toastStateAtom } from '@/store/toast/atom';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { dropdownStateAtom } from '@/store/dropdown/atom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps): React.ReactElement => {
  const router = useRouter();
  const toastType = useRecoilValue(toastStateAtom);
  const dropdownState = useRecoilValue(dropdownStateAtom);

  useEffect(() => storePathValues, [router.asPath]);

  return (
    <>
      <Container>
        <ContainerInner>
          {dropdownState && <DropdownMenu />}
          {children}
        </ContainerInner>
      </Container>
      <CommonToast type={toastType} />
    </>
  );
};

export default AppLayout;
