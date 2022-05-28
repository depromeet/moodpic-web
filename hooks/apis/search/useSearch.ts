import { useQuery, UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from 'http';
import { QUERY_KEY } from '../../../shared/constants/queryKey';
import { SearchedPost, TagFrequencies } from '@/shared/type/post';
import searchService from '../../../service/apis/searchService';

const useSearchedPostsByNewest = (searchedTag: string): UseQueryResult<SearchedPost[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_SEARCHED_BY_TAG, () => searchService.getSearchedPostsByNewest(searchedTag));

const useSearchedPostsByPopularity = (
  searchedTag: string,
): UseQueryResult<SearchedPost[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_SEARCHED_BY_TAG, () => searchService.getSearchedPostsByPopularity(searchedTag));

const usePopularTags = (): UseQueryResult<TagFrequencies[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POPULAR_TAGS, () => searchService.getPopularTags());

export { useSearchedPostsByNewest, useSearchedPostsByPopularity, usePopularTags };
