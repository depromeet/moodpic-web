import { useQuery, UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '../../../shared/type/common';
import { QUERY_KEY } from '../../../shared/constants/queryKey';
import memberService from '../../../service/apis/memberService';
import { Me } from '../../../shared/type/member';

export const useMemberQuery = (): UseQueryResult<Me, AxiosError<ServerResponse>> => {
  return useQuery(QUERY_KEY.GET_ME, () => memberService.getMe());
};
