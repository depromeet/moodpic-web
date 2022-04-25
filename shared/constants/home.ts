export const HOME_TAB_TYPE = {
  FOLDER: 'folder',
  EMOTION: 'emotion',
} as const;

export const HOME_TAB_LABEL = {
  FOLDER: '폴더별',
  EMOTION: '감정별',
} as const;

export type CurrentTabType = typeof HOME_TAB_TYPE[keyof typeof HOME_TAB_TYPE];
