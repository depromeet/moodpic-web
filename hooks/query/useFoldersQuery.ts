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
  const {
    data: { data },
  } = await apiClient.get('/folders');

  return data;
};

const useFoldersQuery = () => {
  return useQuery<FolderResponse, Error>(QUERY_KEY.GET_FOLDERS, fetchFolders);
};

export { useFoldersQuery, fetchFolders };
