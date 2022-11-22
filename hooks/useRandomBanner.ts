import { TOTAL_BANNER_BACKGROUND_SIZE } from '@/shared/constants/home';
import { ReactNode, useEffect, useState } from 'react';

const useRandomBanner = (randomTitleCases: ReactNode[]) => {
  const [randomImageSource, setRandomImageSource] = useState('');
  const [randomTitle, setRandomTitle] = useState<ReactNode | null>(null);

  const randomIndex = Math.floor(TOTAL_BANNER_BACKGROUND_SIZE * Math.random()) + 1;
  const randomTitleIndex = Math.floor(randomTitleCases.length * Math.random());
  const randomBackgroundSource = `/images/main-banner${randomIndex}.png`;

  useEffect(() => {
    setRandomImageSource(randomBackgroundSource);
    setRandomTitle(randomTitleCases[randomTitleIndex]);
  }, []);

  return {
    randomImageSource,
    randomTitle,
  };
};

export default useRandomBanner;
