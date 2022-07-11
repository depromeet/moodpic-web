import { useEffect, useRef, useState } from 'react';

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const useAddToHomescreenPrompt = (): [boolean, () => void] => {
  const deferredPrompt = useRef<IBeforeInstallPromptEvent | null>(null);
  const [isVisible, setVisible] = useState(false);

  const promptToInstall = () => {
    if (!deferredPrompt.current) return false;

    //홈화면의 추가를 실행시킨다
    deferredPrompt.current.prompt();

    //실행 후 유저가 설치를 했는지 안했는지를 알 수 있다
    deferredPrompt.current.userChoice.then((choiceResult) => {
      //설치 했을 때
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
        setVisible(false);
      } else {
        //설치 하지 않았을 때
        console.log('User dismissed the A2HS prompt');
      }
    });
  };

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();

      deferredPrompt.current = e;
      setVisible(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener('beforeinstallprompt', ready as any);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener('beforeinstallprompt', ready as any);
    };
  }, []);

  return [isVisible, promptToInstall];
};

export default useAddToHomescreenPrompt;
