import { useQuery, UseQueryResult } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ServerResponse } from '@/shared/type/common';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import memberService from '@/service/apis/memberService';

export const useMemberQuery = (): UseQueryResult<AxiosResponse, AxiosError<ServerResponse>> => {
  return useQuery(QUERY_KEY.GET_ME, () => memberService.getMe());
};
