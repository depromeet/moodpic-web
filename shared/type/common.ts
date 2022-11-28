export type Dictionary<T> = {
  [index: string]: T;
};

export interface ServerResponse {
  code: number;
  data: null;
  msg: string;
  success: boolean;
}

export interface PaginationParam {
  page?: number;
  size?: number;
}

export interface Pagination {
  nextPage?: number;
  hasNext?: boolean;
}

export const ToastType = {
  ERROR: 'error',
  WARNING: 'warning',
  CONFIRM: 'confirm',
} as const;

export type ToastType = typeof ToastType[keyof typeof ToastType];

export type WriteModeType = 'diary' | 'worry';
