import { PageType } from './common';

export interface Post {
  id: string;
  tags: string[];
  firstCategory: string;
  secondCategory: string;
  content: string;
  views: number;
  createdAt: string;
}

export interface PostListRequest extends PageType {
  folderId: number;
}

export interface PostListResponse {
  posts: Post[];
  folderName: string;
  totalCount: number;
}
