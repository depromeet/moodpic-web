import { Folder } from '@/shared/type/folder';
import fetcher from '@/shared/utils/fetcher';
import { ServerResponse } from 'http';

export interface FolderResponse {
  folders: Folder[];
  postsThumbnail: string[];
}

const folderService = {
  getFolders: async (): Promise<FolderResponse> => {
    const { data } = await fetcher('get', '/api/v1/folders');

    return data;
  },
  getFolderByPostId: async (postId: string): Promise<Folder> => {
    const { data } = await fetcher('get', `/api/v1/folders/posts/${postId}`);

    return data;
  },
  createFolder: async (folderName: string): Promise<ServerResponse> => {
    const { data } = await fetcher('post', '/api/v1/folders', { folderName });

    return data;
  },
  updateFolder: async (id: number, folderName: string): Promise<ServerResponse> => {
    const { data } = await fetcher('patch', `/api/v1/folders/${id}`, {
      folderName,
    });

    return data;
  },
  deleteFolder: async (id: number) => {
    const { data } = await fetcher('delete', `/api/v1/folders/${id}`);

    return data;
  },
};

export default folderService;
