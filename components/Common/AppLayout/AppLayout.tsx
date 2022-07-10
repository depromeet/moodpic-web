import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { storePathValues } from '@/shared/utils/storePathValues';
import { useRouter } from 'next/router';
import { CommonToast } from '@/components/Common';
import { Container, ContainerInner } from './AppLayout.styles';
import { toastStateAtom } from '@/store/toast/atom';
import DropdownMenu from '@/components/Common/DropdownMenu/DropdownMenu';
import { dropdownStateAtom } from '@/store/dropdown/atom';
import { ROUTES } from '@/shared/constants/routes';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps): React.ReactElement => {
  const router = useRouter();
  const toastType = useRecoilValue(toastStateAtom);
  const dropdownState = useRecoilValue(dropdownStateAtom);

  useEffect(() => {
    storePathValues();
  }, [router.asPath]);

  const horizontalPaddingNone = useCallback(() => {
    return router.asPath === ROUTES.LOGIN ? 'horizontal-padding-none' : '';
  }, [router.asPath]);

  return (
    <>
      <Container>
        <ContainerInner className={horizontalPaddingNone()}>
          {dropdownState && <DropdownMenu />}
          {children}
        </ContainerInner>
      </Container>
      <CommonToast type={toastType} />
    </>
  );
};

export default AppLayout;
