import { LocalStorageKey } from '@/shared/type/localStorage';

export const getLocalStorageValue = (key: LocalStorageKey) => {
  if (typeof window === 'undefined') return;

  const value = window.localStorage.getItem(key);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    throw new Error('CANNOT_PARSE_TO_JSON');
  }
};

export const setLocalStorageValue = (key: LocalStorageKey, value: unknown) => {
  if (!value) throw new Error('LOCAL_STORAGE_VALUE_ERROR');

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageValue = (key: LocalStorageKey) => {
  if (!getLocalStorageValue(key)) return;

  window.localStorage.removeItem(key);
};
