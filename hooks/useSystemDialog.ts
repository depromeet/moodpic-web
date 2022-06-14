import { systemDialogAtom } from '@/store/systemDialog/atom';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const useSystemDialog = (toggleDialog: () => void) => {
  const router = useRouter();
  const currentPathname = typeof window !== 'undefined' ? globalThis.location.pathname : '';
  const [confirmState, setConfirmState] = useRecoilState(systemDialogAtom);
  const [currentPath, setCurrentPath] = useState('');
  const [previousPath, setPreviousPath] = useState('');

  const toggleSystemDialog = useCallback(() => toggleDialog(), [toggleDialog]);

  const browserTabcloseHandler = useCallback((e) => {
    e.preventDefault(); // 새로고침 시, 뒤로가기 시에 브라우저단에서 얼럿 노출
    e.returnValue = ''; // 크롬에서는 필수
  }, []);

  /**
   * 뒤로가기 눌렀을때 나가기 전 물어보는 기능
   */
  useEffect(() => {
    if (typeof window !== undefined) {
      window.onbeforeunload = browserTabcloseHandler;
    }

    return () => {
      if (typeof window !== undefined) {
        window.onbeforeunload = null;
      }
    };
  }, [router, browserTabcloseHandler]);

  const routeChangeStart = useCallback(
    (url: string) => {
      if (currentPathname !== url && !confirmState) {
        setCurrentPath(currentPathname);
        setPreviousPath(url);

        toggleSystemDialog();
        router.events.emit('routeChangeError');
        throw 'Abort route change. Please ignore this error.';
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [confirmState, router.asPath, router.events],
  );

  const confirmSystemDialog = () => {
    setConfirmState(true);
  };

  const cancelSystemDialog = async () => {
    window.history.pushState(currentPath, '');
    router.push(currentPath);
    toggleDialog();
  };

  const removeRouteChangeEvent = () => {
    router.events.off('routeChangeStart', routeChangeStart);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', routeChangeStart);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [routeChangeStart, router.events]);

  useEffect(() => {
    if (confirmState) {
      toggleSystemDialog();
      router.replace(previousPath);
    }

    return () => {
      setConfirmState(false);
    };
  }, [confirmState, previousPath, router, setConfirmState, toggleSystemDialog]);

  return {
    confirmSystemDialog,
    cancelSystemDialog,
    removeRouteChangeEvent,
  };
};

export default useSystemDialog;
