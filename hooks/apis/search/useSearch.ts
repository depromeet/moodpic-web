import { useQuery, UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from 'http';
import { QUERY_KEY } from '../../../shared/constants/queryKey';
import { Post, TagFrequencies } from '@/shared/type/post';
import searchService from '../../../service/apis/searchService';
import { TAG_SEARCH_ORDER_TYPE, TagSearchOrderType } from '../../../shared/constants/tagSearch';

const useSearchedPostsQuery = ({
  searchedTag,
  orderType,
}: {
  searchedTag: string;
  orderType: TagSearchOrderType;
}): UseQueryResult<Post[], AxiosError<ServerResponse>> => {
  const getSearchedPosts =
    orderType === TAG_SEARCH_ORDER_TYPE.NEWEST
      ? searchService.getSearchedPostsByNewest
      : searchService.getSearchedPostsByPopularity;

  return useQuery(QUERY_KEY.GET_SEARCHED_BY_TAG, () => getSearchedPosts(searchedTag), {
    enabled: false,
  });
};

const usePopularTags = (): UseQueryResult<TagFrequencies[], AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_POPULAR_TAGS, () => searchService.getPopularTags());

export { useSearchedPostsQuery, usePopularTags };
