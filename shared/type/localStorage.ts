import { LOCAL_STORAGE_KEY } from '../constants/storageKey';

export type LocalStorageKey = typeof LOCAL_STORAGE_KEY[keyof typeof LOCAL_STORAGE_KEY];
