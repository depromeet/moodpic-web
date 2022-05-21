import Error from 'next/error';
import { useQuery } from 'react-query';
import { apiClient } from '@/shared/api/apiClient';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { Folder } from '@/shared/type/folder';

interface FolderResponse {
  folders: Folder[];
  postsThumbnail: string[];
}
const fetchFolders = async (): Promise<FolderResponse> => {
  const { data } = await apiClient.get('/api/v1/folders');

  return data;
};

export const useFoldersQuery = () => {
  return useQuery<FolderResponse, Error>(QUERY_KEY.GET_FOLDERS, fetchFolders);
};
