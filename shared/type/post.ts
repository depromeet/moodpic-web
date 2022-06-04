import { PageType } from './common';

export interface Post {
  id: string;
  tags: string[];
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

export interface PostListRequest extends PageType {
  folderId?: number;
  categoryId?: number;
}

export interface PostListResponse {
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

export interface PostResponseType {
  postId: string;
}
