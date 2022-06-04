import { useQuery, UseQueryResult, useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import postService from '@/service/apis/postService';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { Post, PostListRequest, PostListResponse, CategoryFolder } from '@/shared/type/post';
import { AxiosError } from 'axios';
import { PaginationParam, ServerResponse } from '@/shared/type/common';
import { PAGE_SIZE } from '@/shared/constants/common';

const usePostsQuery = (): UseInfiniteQueryResult<PostListResponse, AxiosError<ServerResponse>> =>
  useInfiniteQuery(
    QUERY_KEY.GET_POSTS,
    ({ pageParam = 0 }) => postService.getPosts({ page: pageParam, size: PAGE_SIZE }),
    {
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextPage : undefined),
    },
  );

const useIncompletedPostsQuery = ({
  page,
  size = PAGE_SIZE,
}: PaginationParam): UseQueryResult<Post[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS, () => postService.getIncompletedPosts({ page, size }));

const usePostQuery = (id: string): UseQueryResult<Post, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS, () => postService.getPostById(id));

const usePostsByFolderIdQuery = ({
  folderId,
}: PostListRequest): UseInfiniteQueryResult<PostListResponse, AxiosError<ServerResponse>> =>
  useInfiniteQuery(
    QUERY_KEY.GET_POSTS_BY_FOLDER_ID,
    ({ pageParam = 0 }) => postService.getPostsByFolderId({ folderId, page: pageParam, size: PAGE_SIZE }),
    {
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextPage : undefined),
      enabled: !!folderId,
    },
  );

const usePostByIdQuery = (id: string): UseQueryResult<Post, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POST_BY_ID, () => postService.getPostById(id), { enabled: !!id });

const usePostsByCategoryQuery = (): UseQueryResult<CategoryFolder[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS_BY_CATEGORIES, postService.getPostsByCategories, { enabled: false });

const usePostsByCategoryIdQuery = ({
  categoryId,
}: PostListRequest): UseInfiniteQueryResult<PostListResponse, AxiosError<ServerResponse>> =>
  useInfiniteQuery(
    QUERY_KEY.GET_POSTS_BY_CATEGORIES,
    ({ pageParam = 0 }) => postService.getPostsByCategoryId({ categoryId, page: pageParam, size: PAGE_SIZE }),
    {
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextPage : undefined),
      enabled: !!categoryId,
    },
  );

export {
  usePostsQuery,
  useIncompletedPostsQuery,
  usePostQuery,
  usePostsByCategoryQuery,
  usePostByIdQuery,
  usePostsByFolderIdQuery,
  usePostsByCategoryIdQuery,
};
