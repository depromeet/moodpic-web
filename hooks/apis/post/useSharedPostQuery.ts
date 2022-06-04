import { useQuery, UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '../../../shared/type/common';
import { QUERY_KEY } from '../../../shared/constants/queryKey';
import shareService, { GetSharedPostResponse } from '../../../service/apis/shareService';

const useSharedPostQuery = (link: string): UseQueryResult<GetSharedPostResponse, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_SEARCHED_POST, () => shareService.getSharedPost(link));

export { useSharedPostQuery };
