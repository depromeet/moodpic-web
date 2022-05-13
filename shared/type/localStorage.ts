import { LOCAL_STORAGE_KEY } from '../constants/localStorageKey';

export type LocalStorageKey =
  typeof LOCAL_STORAGE_KEY[keyof typeof LOCAL_STORAGE_KEY];
