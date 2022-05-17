export type Dictionary<T> = {
  [index: string]: T;
};

export interface ServerResponse {
  code: number;
  data: null;
  msg: string;
  success: boolean;
}

export interface PageType {
  page?: number;
  size?: number;
}
