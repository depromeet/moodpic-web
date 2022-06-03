import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import folderService, { FolderResponse } from '@/service/apis/folderService';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/shared/type/common';

const useFoldersQuery = (): UseQueryResult<FolderResponse, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_FOLDERS, folderService.getFolders);

export { useFoldersQuery };
