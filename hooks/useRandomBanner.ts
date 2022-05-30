import { TOTAL_BANNER_BACKGROUND_SIZE } from '@/shared/constants/home';

export const useRandomBanner = () => {
  const randomIndex = Math.floor(TOTAL_BANNER_BACKGROUND_SIZE * Math.random()) + 1;
  const randomImageSource = `/images/main-banner${randomIndex}.png`;

  return {
    randomImageSource,
  };
};
