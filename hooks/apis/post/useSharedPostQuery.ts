import { useQuery, UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/shared/type/common';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import shareService from '@/service/apis/shareService';
import { GetSharedPostResponse } from '@/shared/type/share';

const useSharedPostQuery = (link: string): UseQueryResult<GetSharedPostResponse, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_SEARCHED_POST, () => shareService.getSharedPost(link), { enabled: false });

export { useSharedPostQuery };
