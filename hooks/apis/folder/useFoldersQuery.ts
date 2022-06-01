import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import folderService, { FolderResponse } from '@/service/apis/folderService';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/shared/type/common';
import { Folder } from '@/shared/type/folder';

const useFoldersQuery = (): UseQueryResult<FolderResponse, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_FOLDERS, folderService.getFolders);

const useFolderByPostIdQuery = (postId: string): UseQueryResult<Folder, AxiosError<ServerResponse>> =>
  useQuery(QUERY_KEY.GET_FOLDER_BY_POST_ID, () => folderService.getFolderByPostId(postId), { enabled: false });

export { useFoldersQuery, useFolderByPostIdQuery };
