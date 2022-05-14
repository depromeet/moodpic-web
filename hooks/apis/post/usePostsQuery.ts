import { useQuery, UseQueryResult } from 'react-query';
import postService from '@/service/apis/postService';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { Post } from '@/shared/type/post';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/shared/type/common';

const usePostsQuery = (): UseQueryResult<Post[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS, postService.getPosts);

const useIncompletePostsQuery = (): UseQueryResult<
  Post[],
  AxiosError<ServerResponse>
> => useQuery(QUERY_KEY.GET_POSTS, postService.getIncompletePosts);

const usePostQuery = (
  id: number,
): UseQueryResult<Post, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POSTS, () => postService.getPostById(id));

const useAllPostsQuery = (): UseQueryResult<
  Post[],
  AxiosError<ServerResponse>
> => useQuery(QUERY_KEY.GET_POSTS, postService.getAllPosts);

export {
  usePostsQuery,
  useIncompletePostsQuery,
  usePostQuery,
  useAllPostsQuery,
};
