import { Pagination, PaginationParam } from './common';

export type Tag = string;

export interface Post {
  id: string;
  tags: Tag[];
  firstCategory: string;
  secondCategory: string;
  firstCategoryName: string;
  secondCategoryName: string;
  content: string;
  views: number;
  disclosure: boolean;
  my: boolean;
  folderId?: number;
  createdAt: string;
}

export interface TagFrequencies {
  tag: string;
  frequency: number;
}

export interface PostListRequest extends PaginationParam {
  folderId?: number;
  categoryId?: number;
}

export interface PostListResponse extends Pagination {
  posts: Post[];
  categoryName?: string;
  folderName?: string;
  totalCount: number;
}

export interface CategoryFolder {
  categoryId: number;
  description: string;
  count: number;
  image: string;
}

export interface PostRequestType {
  firstCategory: string;
  secondCategory: string;
  content: string;
  tags: string[];
  disclosure: boolean;
  folderId: number | undefined;
}

export interface WriteFormValues {
  firstCategory: string;
  secondCategory: string;
  content: string;
  worryQuestion1: string | undefined;
  worryQuestion2: string | undefined;
  worryQuestion3: string | undefined;
  tags: string[];
  disclosure: boolean;
  folderId: number | undefined;
}

export interface PostResponseType {
  postId: string;
}
