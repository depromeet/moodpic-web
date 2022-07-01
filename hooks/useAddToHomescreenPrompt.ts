import { useEffect, useRef, useState } from 'react';

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useAddToHomescreenPrompt(): [boolean, () => void] {
  const deferredPrompt = useRef<IBeforeInstallPromptEvent | null>(null);
  const [isVisible, setVisible] = useState(false);

  const promptToInstall = () => {
    if (!deferredPrompt.current) return false;

    //홈화면의 추가를 실행시킨다
    deferredPrompt.current.prompt();

    //실행 후 유저가 설치를 했는지 안했는지를 알 수 있다
    deferredPrompt.current.userChoice.then((choiceResult) => {
      //설치 되어있을 때
      if (choiceResult.outcome === 'accepted') {
        setVisible(false);
      }
    });
  };

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();

      deferredPrompt.current = e;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener('beforeinstallprompt', ready as any);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener('beforeinstallprompt', ready as any);
    };
  }, []);

  return [isVisible, promptToInstall];
}
