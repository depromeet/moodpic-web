import { BANNER_TITLE_CASES, TOTAL_BANNER_BACKGROUND_SIZE } from '@/shared/constants/home';

export const useRandomBanner = () => {
  const randomIndex = Math.floor(TOTAL_BANNER_BACKGROUND_SIZE * Math.random()) + 1;
  const randomTitle = BANNER_TITLE_CASES[Math.floor(BANNER_TITLE_CASES.length * Math.random())];
  const randomImageSource = `/images/main-banner${randomIndex}.png`;

  return {
    randomTitle,
    randomImageSource,
  };
};
