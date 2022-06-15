export const MAX_THUMBNAIL_SIZE = 4;

export const HOME_TAB_TYPE = {
  FOLDER: 'folder',
  EMOTION: 'emotion',
} as const;

export const HOME_TAB_LABEL = {
  FOLDER: '폴더별',
  EMOTION: '감정별',
} as const;

export type CurrentTabType = typeof HOME_TAB_TYPE[keyof typeof HOME_TAB_TYPE];

export const BANNER_TITLE_CASES = [
  '님의 <br />모든 감정은 소중해잉 🥺',
  '님, 감정을 되짚어보면 <br />기분이 나아질거예요!',
  '님, 오늘 어떤 일이 <br />있었는지 들려주세요!',
  '님, 오늘의 감정을 <br />풀어보는 시간을 가져볼까요?',
];

export const TOTAL_BANNER_BACKGROUND_SIZE = 3;
export const MINIMUM_FOLDER_SIZE = 1;
