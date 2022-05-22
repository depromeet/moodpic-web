import { useQuery, UseQueryResult } from 'react-query';
import postService from '@/service/apis/postService';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { Post, PostListRequest, PostListResponse, CategoryFolder } from '@/shared/type/post';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/shared/type/common';
import { PAGE_SIZE } from '@/shared/constants/common';

const usePostsQuery = (): UseQueryResult<Post[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS, postService.getPosts);

const useIncompletePostsQuery = (): UseQueryResult<Post[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS, postService.getIncompletePosts);

const usePostQuery = (id: string): UseQueryResult<Post, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS, () => postService.getPostById(id));

const useAllPostsQuery = (): UseQueryResult<Post[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS, postService.getAllPosts);

const usePostsByFolderIdQuery = ({
  folderId,
  page = 0,
  size = PAGE_SIZE,
}: PostListRequest): UseQueryResult<PostListResponse, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS_BY_FOLDER_ID, () => postService.getPostsByFolderId({ folderId, page, size }));

const usePostByIdQuery = (id: string): UseQueryResult<Post, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POST_BY_ID, () => postService.getPostById(id));

const usePostsByCategoryQuery = (): UseQueryResult<CategoryFolder[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS_BY_CATEGORIES, postService.getPostsByCategories, { enabled: false });

export {
  usePostsQuery,
  useIncompletePostsQuery,
  usePostQuery,
  useAllPostsQuery,
  usePostsByCategoryQuery,
  usePostByIdQuery,
  usePostsByFolderIdQuery,
};
