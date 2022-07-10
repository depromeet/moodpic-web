import { LOCAL_STORAGE_KEY } from '@/shared/constants/storageKey';

export type LocalStorageKey = typeof LOCAL_STORAGE_KEY[keyof typeof LOCAL_STORAGE_KEY];
